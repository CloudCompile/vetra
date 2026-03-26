import type { ApiKey } from '@prisma/client';
import { db } from '@/lib/db';
import type { ChatCompletionRequest } from '@/lib/schemas/chat';

export function getStartOfMonth(date = new Date()): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

export function estimateTokensFromText(text: string): number {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}

export function estimateTokensFromMessages(messages: ChatCompletionRequest['messages']): number {
  return messages.reduce((total, message) => total + estimateTokensFromText(message.content), 0);
}

export async function resetApiKeyUsageIfNeeded(apiKey: ApiKey): Promise<ApiKey> {
  const startOfMonth = getStartOfMonth();
  if (apiKey.quotaResetAt >= startOfMonth) return apiKey;

  return db.apiKey.update({
    where: { id: apiKey.id },
    data: { usageThisMonth: 0, quotaResetAt: startOfMonth },
  });
}

export async function getUserRequestCountThisMonth(userId: string): Promise<number> {
  return db.usageLog.count({
    where: {
      userId,
      createdAt: { gte: getStartOfMonth() },
    },
  });
}
