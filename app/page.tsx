import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="text-4xl font-semibold">Vetra</h1>
      <p className="text-lg text-slate-700">
        A whispered recommendation in a storm-lit library: reliable AI inference APIs and a focused admin dashboard.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="rounded bg-slate-900 px-4 py-2 text-white">Open Dashboard</Link>
        <a href="/api/v1/health" target="_blank" rel="noopener noreferrer" className="rounded border border-slate-300 px-4 py-2">API Health</a>
      </div>
    </main>
  );
}
