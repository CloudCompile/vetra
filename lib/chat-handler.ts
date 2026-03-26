import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { logger } from '@/lib/logging';
import { recordUsage } from '@/lib/metrics';
import { providerNameFromModel } from '@/lib/providers/model-router';
import { globalRegistry } from '@/lib/providers/registry';
import { globalRateLimiter } from '@/lib/rate-limiter';
import { ChatCompletionRequestSchema } from '@/lib/schemas/chat';
import { ensureUser } from '@/lib/auth';
import { ensurePlanForUser } from '@/lib/plans';
import {
  estimateTokensFromMessages,
  estimateTokensFromText,
  getStartOfMonth,
  getUserRequestCountThisMonth,
  resetApiKeyUsageIfNeeded,
} from '@/lib/usage';
import { createOpenAIStream } from '@/lib/openai-stream';

type AuthContext = {
  userId: string | null;
  planId: string;
  rateKey: string;
  apiKeyId?: string;
};

export async function handleChatCompletion(request: NextRequest, options?: { forceStream?: boolean }) {
  const start = Date.now();

  try {
    const { userId: clerkUserId } = await auth();
    const bearer = request.headers.get('authorization');
    const apiKey = bearer?.startsWith('Bearer ') ? bearer.slice(7) : undefined;

    if (!clerkUserId && !apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let authContext: AuthContext | null = null;
    let apiKeyRecord = null;

    if (apiKey) {
      apiKeyRecord = await db.apiKey.findUnique({
        where: { key: apiKey },
        include: { plan: true, user: true },
      });

      if (!apiKeyRecord || !apiKeyRecord.isActive) {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 403 });
      }

      if (apiKeyRecord.expiresAt && apiKeyRecord.expiresAt.getTime() <= Date.now()) {
        return NextResponse.json({ error: 'API key expired' }, { status: 403 });
      }

      if (!apiKeyRecord.plan.isActive) {
        return NextResponse.json({ error: 'Plan inactive' }, { status: 403 });
      }

      apiKeyRecord = await resetApiKeyUsageIfNeeded(apiKeyRecord);

      if (apiKeyRecord.usageThisMonth >= apiKeyRecord.plan.monthlyQuota) {
        return NextResponse.json({ error: 'Monthly quota exceeded' }, { status: 402 });
      }

      if (apiKeyRecord.userId) {
        const userUsage = await getUserRequestCountThisMonth(apiKeyRecord.userId);
        if (userUsage >= apiKeyRecord.plan.monthlyQuota) {
          return NextResponse.json({ error: 'Monthly quota exceeded' }, { status: 402 });
        }
      }

      authContext = {
        userId: apiKeyRecord.userId,
        planId: apiKeyRecord.planId,
        rateKey: `key:${apiKeyRecord.id}`,
        apiKeyId: apiKeyRecord.id,
      };
    } else {
      const user = await ensureUser();
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const plan = await ensurePlanForUser(user.id, user.planId);
      if (!plan.isActive) {
        return NextResponse.json({ error: 'Plan inactive' }, { status: 403 });
      }

      const usageCount = await getUserRequestCountThisMonth(user.id);
      if (usageCount >= plan.monthlyQuota) {
        return NextResponse.json({ error: 'Monthly quota exceeded' }, { status: 402 });
      }

      authContext = {
        userId: user.id,
        planId: plan.id,
        rateKey: `user:${user.id}`,
      };
    }

    if (!authContext) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = ChatCompletionRequestSchema.parse(await request.json());
    const provider = globalRegistry.get(providerNameFromModel(parsed.model));

    if (!provider) {
      return NextResponse.json({ error: 'No provider available for model' }, { status: 400 });
    }

    const plan = await db.plan.findUnique({ where: { id: authContext.planId } });
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    if (plan.allowedModels.length > 0 && !plan.allowedModels.includes(parsed.model)) {
      return NextResponse.json({ error: 'Model not available for this plan' }, { status: 403 });
    }

    if (parsed.max_tokens && parsed.max_tokens > plan.maxTokens) {
      return NextResponse.json({ error: 'Requested max_tokens exceeds plan limit' }, { status: 400 });
    }

    if (!globalRateLimiter.canConsume(authContext.rateKey, { requestsPerMinute: plan.rateLimit })) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const isStream = options?.forceStream ?? parsed.stream;
    const promptTokens = estimateTokensFromMessages(parsed.messages);

    const persistUsage = async ({
      completionText,
      usage,
      status,
      errorMessage,
    }: {
      completionText?: string;
      usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
      status: 'success' | 'error';
      errorMessage?: string;
    }) => {
      const duration = Date.now() - start;
      recordUsage(parsed.model, status, duration);
      const completionTokens =
        usage?.completion_tokens ??
        (completionText ? estimateTokensFromText(completionText) : 0);
      const totalTokens =
        usage?.total_tokens ?? (completionTokens ? completionTokens + promptTokens : promptTokens);

      await db.usageLog.create({
        data: {
          apiKeyId: authContext.apiKeyId ?? null,
          userId: authContext.userId ?? null,
          model: parsed.model,
          inputTokens: usage?.prompt_tokens ?? promptTokens,
          outputTokens: completionTokens,
          totalTokens,
          durationMs: duration,
          status,
          errorMessage: errorMessage ?? null,
        },
      });

      if (authContext.apiKeyId) {
        await db.apiKey.update({
          where: { id: authContext.apiKeyId },
          data: { lastUsedAt: new Date(), usageThisMonth: { increment: 1 } },
        });
      }
    };

    if (isStream) {
      const tokenStream = provider.stream(parsed);
      return createOpenAIStream({
        model: parsed.model,
        tokenStream,
        onComplete: async (completionText) => {
          await persistUsage({ completionText, status: 'success' });
        },
        onError: async (error) => {
          logger.error({ err: error }, 'chat completion stream failed');
          await persistUsage({ status: 'error', errorMessage: 'stream_failed' });
        },
      });
    }

    const result = await provider.generate(parsed);
    await persistUsage({ usage: result.usage, status: 'success' });
    return NextResponse.json(result);
  } catch (error) {
    logger.error({ err: error }, 'chat completion failed');
    recordUsage('unknown', 'error', Date.now() - start);
    return NextResponse.json({ error: 'Failed to process completion request' }, { status: 500 });
  }
}
