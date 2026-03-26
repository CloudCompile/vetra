import Link from 'next/link';
import { isAdmin } from '@/lib/auth';

export default async function AdminDashboardPage() {
  const admin = await isAdmin();
  if (!admin) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-slate-500">You do not have access to this page.</p>
      </main>
    );
  }

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <ul className="list-disc space-y-1 pl-5 text-slate-700">
        <li><Link className="underline" href="/dashboard/admin/keys">Manage API Keys</Link></li>
        <li><Link className="underline" href="/dashboard/admin/plans">Manage Plans</Link></li>
        <li><Link className="underline" href="/dashboard/admin/usage">Usage Metrics</Link></li>
      </ul>
    </main>
  );
}
