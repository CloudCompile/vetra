import Link from 'next/link';
import { isAdmin } from '@/lib/auth';
import { Card } from '@/components/ui/Card';

export default async function AdminDashboardPage() {
  const admin = await isAdmin();
    if (!admin) {
      return (
        <main className="space-y-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-vetra-ink/70">You do not have access to this page.</p>
        </main>
      );
    }

    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <Card>
          <ul className="space-y-2 text-vetra-ink/80">
            <li>
              <Link className="underline decoration-vetra-accent/60" href="/dashboard/admin/keys">
                Manage API Keys
              </Link>
            </li>
            <li>
              <Link className="underline decoration-vetra-accent/60" href="/dashboard/admin/plans">
                Manage Plans
              </Link>
            </li>
            <li>
              <Link className="underline decoration-vetra-accent/60" href="/dashboard/admin/usage">
                Usage Metrics
              </Link>
            </li>
          </ul>
        </Card>
      </main>
    );
}
