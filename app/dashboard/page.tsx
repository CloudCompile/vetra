import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Vetra Dashboard</h1>
      <p className="text-slate-600">Monitor your usage, plans, and API access in one calm storm-blue console.</p>
      <Link className="text-slate-800 underline" href="/dashboard/admin">
        Go to Admin Dashboard
      </Link>
    </main>
  );
}
