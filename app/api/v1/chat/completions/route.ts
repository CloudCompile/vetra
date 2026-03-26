import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { logger } from '@/lib/logging';
import { recordUsage } from '@/lib/metrics';
import { globalRegistry } from '@/lib/providers/registry';
import { globalRateLimiter } from '@/lib/rate-limiter';
import { ChatCompletionRequestSchema } from '@/lib/schemas/chat';

function providerNameFromModel(model: string) {
  return model.startsWith('gpt') || model.startsWith('openai') ? 'openai' : 'local';
}

export async function POST(request: NextRequest) {
  const start = Date.now();

  try {
    const { userId } = await auth();
    const bearer = request.headers.get('authorization');
    const apiKey = bearer?.startsWith('Bearer ') ? bearer.slice(7) : undefined;

    if (!userId && !apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let apiKeyRecord = null;
    let rateKey = userId ?? 'anonymous';
    let planRateLimit = 10;

    if (apiKey) {
      apiKeyRecord = await db.apiKey.findUnique({
        where: { key: apiKey },
        include: { plan: true },
      });

      if (!apiKeyRecord || !apiKeyRecord.isActive) {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 403 });
      }

      if (apiKeyRecord.expiresAt && apiKeyRecord.expiresAt.getTime() < Date.now()) {
        return NextResponse.json({ error: 'API key expired' }, { status: 403 });
      }

      rateKey = `key:${apiKeyRecord.id}`;
      planRateLimit = apiKeyRecord.plan.rateLimit;
    }

    if (!globalRateLimiter.canConsume(rateKey, { requestsPerMinute: planRateLimit })) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const parsed = ChatCompletionRequestSchema.parse(await request.json());
    const provider = globalRegistry.get(providerNameFromModel(parsed.model));

    if (!provider) {
      return NextResponse.json({ error: 'No provider available for model' }, { status: 400 });
    }

    const result = await provider.generate(parsed);
    const duration = Date.now() - start;
    recordUsage(parsed.model, 'success', duration);

    if (apiKeyRecord) {
      await db.apiKey.update({
        where: { id: apiKeyRecord.id },
        data: { lastUsedAt: new Date(), usageThisMonth: { increment: 1 } },
      });

      await db.usageLog.create({
        data: {
          apiKeyId: apiKeyRecord.id,
          userId: apiKeyRecord.userId,
          model: parsed.model,
          inputTokens: result.usage.prompt_tokens,
          outputTokens: result.usage.completion_tokens,
          totalTokens: result.usage.total_tokens,
          durationMs: duration,
          status: 'success',
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    logger.error({ err: error }, 'chat completion failed');
    recordUsage('unknown', 'error', Date.now() - start);
    return NextResponse.json({ error: 'Failed to process completion request' }, { status: 500 });
  }
}
