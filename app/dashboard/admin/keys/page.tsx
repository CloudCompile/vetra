import { CreateKeyForm } from './components/CreateKeyForm';
import { KeyList } from './components/KeyList';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/auth';

export default async function KeysPage() {
  const admin = await isAdmin();
  if (!admin) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">API Keys</h1>
        <p className="text-sm text-vetra-ink/70">You do not have access to this page.</p>
      </main>
    );
  }

  const [keys, plans] = await Promise.all([
    db.apiKey.findMany({ include: { plan: true, user: true }, orderBy: { createdAt: 'desc' } }),
    db.plan.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">API Keys</h1>
      <CreateKeyForm
        plans={plans.map((plan) => ({ id: plan.id, name: plan.name }))}
        showPlanPicker
        showUserIdField
      />
      <KeyList
        keys={keys.map((key) => ({
          id: key.id,
          name: key.name,
          isActive: key.isActive,
          key: key.key,
          planName: key.plan?.name ?? null,
          userEmail: key.user?.email ?? null,
          usageThisMonth: key.usageThisMonth,
          lastUsedAt: key.lastUsedAt?.toLocaleString() ?? null,
          expiresAt: key.expiresAt?.toLocaleString() ?? null,
        }))}
      />
    </main>
  );
}
