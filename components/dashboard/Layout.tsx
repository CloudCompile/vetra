import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { isAdmin } from '@/lib/auth';
import { AuthStatus } from '@/components/dashboard/AuthStatus';

export async function DashboardLayout({ children }: PropsWithChildren) {
  const admin = await isAdmin();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">Vetra Console</p>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <AuthStatus />
      </header>
      <nav className="mb-8 flex flex-wrap gap-4 text-sm text-slate-600">
        <Link className="rounded-md px-3 py-1 hover:bg-slate-100" href="/dashboard">
          Overview
        </Link>
        <Link className="rounded-md px-3 py-1 hover:bg-slate-100" href="/dashboard/keys">
          API Keys
        </Link>
        {admin ? (
          <>
            <Link className="rounded-md px-3 py-1 hover:bg-slate-100" href="/dashboard/admin">
              Admin
            </Link>
            <Link className="rounded-md px-3 py-1 hover:bg-slate-100" href="/dashboard/admin/usage">
              Usage
            </Link>
          </>
        ) : null}
      </nav>
      {children}
    </section>
  );
}
