import Link from 'next/link';
import { ensureUser } from '@/lib/auth';
import { ensurePlanForUser } from '@/lib/plans';
import { db } from '@/lib/db';
import { getStartOfMonth } from '@/lib/usage';
import { Card } from '@/components/ui/Card';

export default async function DashboardPage() {
  const user = await ensureUser();

  if (!user) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">Vetra Dashboard</h1>
        <p className="text-slate-600">Sign in to manage your API keys, usage, and plan.</p>
        <Link className="text-slate-800 underline" href="/sign-in">
          Sign in
        </Link>
      </main>
    );
  }

  const [plan, usageTotals, keyCount] = await Promise.all([
    ensurePlanForUser(user.id, user.planId),
    db.usageLog.aggregate({
      _count: { _all: true },
      _sum: { totalTokens: true },
      where: { userId: user.id, createdAt: { gte: getStartOfMonth() } },
    }),
    db.apiKey.count({ where: { userId: user.id, isActive: true } }),
  ]);

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back{user.name ? `, ${user.name}` : ''}.</h1>
        <p className="text-slate-600">Your account is ready for OpenAI-compatible requests.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase text-slate-500">Plan</p>
          <p className="text-lg font-semibold">{plan.name}</p>
          <p className="text-sm text-slate-500">Quota: {plan.monthlyQuota} requests</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-slate-500">Usage this month</p>
          <p className="text-lg font-semibold">{usageTotals._count._all} requests</p>
          <p className="text-sm text-slate-500">{usageTotals._sum.totalTokens ?? 0} tokens</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-slate-500">Active keys</p>
          <p className="text-lg font-semibold">{keyCount}</p>
          <Link className="text-sm text-slate-600 underline" href="/dashboard/keys">
            Manage keys
          </Link>
        </Card>
      </div>
      <Card>
        <p className="font-medium">Quick start</p>
        <p className="text-sm text-slate-500">
          Use <code className="rounded bg-slate-100 px-1 py-0.5">/api/v1/chat/completions</code> with your API key in
          the Authorization header.
        </p>
      </Card>
    </main>
  );
}
