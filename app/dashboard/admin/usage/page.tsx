import { UsageMetrics } from './components/UsageMetrics';

export default function UsagePage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Usage</h1>
      <UsageMetrics />
    </main>
  );
}
