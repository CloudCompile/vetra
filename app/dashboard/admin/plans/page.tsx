import { PlanEditor } from './components/PlanEditor';
import { PlanList } from './components/PlanList';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/auth';

export default async function PlansPage() {
  const admin = await isAdmin();
  if (!admin) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">Plans</h1>
        <p className="text-sm text-vetra-ink/70">You do not have access to this page.</p>
      </main>
    );
  }

  const plans = await db.plan.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Plans</h1>
      <PlanEditor />
      <PlanList plans={plans} />
    </main>
  );
}
