import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { isAdmin } from '@/lib/auth';
import { AuthStatus } from '@/components/dashboard/AuthStatus';

export async function DashboardLayout({ children }: PropsWithChildren) {
  const admin = await isAdmin();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="clay-panel mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-5">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-vetra-ink/60">Vetra Console</p>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <AuthStatus />
      </header>
      <nav className="mb-8 flex flex-wrap gap-3 text-sm text-vetra-ink/70">
        <Link className="clay-pill rounded-full px-4 py-2 transition hover:text-vetra-ink" href="/dashboard">
          Overview
        </Link>
        <Link className="clay-pill rounded-full px-4 py-2 transition hover:text-vetra-ink" href="/dashboard/keys">
          API Keys
        </Link>
        {admin ? (
          <>
            <Link className="clay-pill rounded-full px-4 py-2 transition hover:text-vetra-ink" href="/dashboard/admin">
              Admin
            </Link>
            <Link className="clay-pill rounded-full px-4 py-2 transition hover:text-vetra-ink" href="/dashboard/admin/usage">
              Usage
            </Link>
          </>
        ) : null}
      </nav>
      {children}
    </section>
  );
}
