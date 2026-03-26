import { UsageMetrics } from './components/UsageMetrics';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
import { getStartOfMonth } from '@/lib/usage';

export default async function UsagePage() {
  const admin = await isAdmin();
  if (!admin) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">Usage</h1>
        <p className="text-sm text-vetra-ink/70">You do not have access to this page.</p>
      </main>
    );
  }

  const startOfMonth = getStartOfMonth();
  const [totals, topModels, topKeys] = await Promise.all([
    db.usageLog.aggregate({
      _count: { _all: true },
      _sum: { totalTokens: true },
      where: { createdAt: { gte: startOfMonth } },
    }),
    db.usageLog.groupBy({
      by: ['model'],
      _count: { _all: true },
      where: { createdAt: { gte: startOfMonth } },
      orderBy: { _count: { model: 'desc' } },
      take: 5,
    }),
    db.usageLog.groupBy({
      by: ['apiKeyId'],
      _count: { _all: true },
      where: { createdAt: { gte: startOfMonth }, apiKeyId: { not: null } },
      orderBy: { _count: { apiKeyId: 'desc' } },
      take: 5,
    }),
  ]);

  const keyIds = topKeys.map((entry) => entry.apiKeyId).filter(Boolean) as string[];
  const keyRecords = keyIds.length
    ? await db.apiKey.findMany({ where: { id: { in: keyIds } } })
    : [];
  const keyLabelMap = new Map(keyRecords.map((key) => [key.id, key.name]));

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Usage</h1>
      <UsageMetrics
        summary={{
          totalRequests: totals._count._all,
          totalTokens: totals._sum.totalTokens ?? 0,
          periodLabel: 'month to date',
        }}
        topModels={topModels.map((entry) => ({ label: entry.model, value: entry._count._all }))}
        topKeys={topKeys.map((entry) => ({
          label: keyLabelMap.get(entry.apiKeyId ?? '') ?? 'Unknown key',
          value: entry._count._all,
        }))}
      />
    </main>
  );
}
