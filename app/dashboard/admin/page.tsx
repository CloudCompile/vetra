import Link from 'next/link';

export default function AdminDashboardPage() {
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
