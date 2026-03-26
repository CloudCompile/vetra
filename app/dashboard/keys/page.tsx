import { ensureUser } from '@/lib/auth';
import { ensurePlanForUser } from '@/lib/plans';
import { db } from '@/lib/db';
import { CreateKeyForm } from '../admin/keys/components/CreateKeyForm';
import { KeyList } from '../admin/keys/components/KeyList';

export default async function KeysPage() {
  const user = await ensureUser();
    if (!user) {
      return (
        <main className="space-y-4">
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <p className="text-sm text-vetra-ink/70">Sign in to create API keys.</p>
        </main>
      );
    }

  const [plan, keys] = await Promise.all([
    ensurePlanForUser(user.id, user.planId),
    db.apiKey.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } }),
  ]);

    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">API Keys</h1>
        <p className="text-sm text-vetra-ink/70">Plan: {plan.name}</p>
        <CreateKeyForm />
        <KeyList
        keys={keys.map((key) => ({
          id: key.id,
          name: key.name,
          isActive: key.isActive,
          key: key.key,
          usageThisMonth: key.usageThisMonth,
          lastUsedAt: key.lastUsedAt?.toLocaleString() ?? null,
          expiresAt: key.expiresAt?.toLocaleString() ?? null,
        }))}
      />
    </main>
  );
}
