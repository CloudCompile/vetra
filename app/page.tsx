import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-6">
        <span className="clay-pill w-fit rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-vetra-ink/70">
          Cozy API Gateway
        </span>
        <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
          Welcome to the <span className="text-vetra-accent">nook</span>.
        </h1>
        <p className="max-w-2xl text-lg text-vetra-ink/70">
          A whispered recommendation in a storm-lit library: reliable AI inference APIs and a focused admin dashboard,
          wrapped in clay-soft comfort.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/dashboard"
          className="clay-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
        >
          Open Dashboard
        </Link>
        <a
          href="/api/v1/health"
          target="_blank"
          rel="noopener noreferrer"
          className="clay-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
        >
          API Health
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-vetra-ink/60">Models</p>
          <p className="mt-2 text-lg font-semibold">200+ choices</p>
          <p className="text-sm text-vetra-ink/70">Curated providers ready for a single OpenAI-compatible API.</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-vetra-ink/60">Keys</p>
          <p className="mt-2 text-lg font-semibold">Calm control</p>
          <p className="text-sm text-vetra-ink/70">Issue, rotate, and monitor keys from a cozy console.</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-vetra-ink/60">Usage</p>
          <p className="mt-2 text-lg font-semibold">Soft guardrails</p>
          <p className="text-sm text-vetra-ink/70">Plans, quotas, and rates that keep traffic tucked in.</p>
        </Card>
      </div>
    </main>
  );
}
