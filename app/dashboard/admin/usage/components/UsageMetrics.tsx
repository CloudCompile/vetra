type UsageSummary = {
  totalRequests: number;
  totalTokens: number;
  periodLabel: string;
};

type UsageEntry = { label: string; value: number };

export function UsageMetrics({
  summary,
  topModels,
  topKeys,
}: {
  summary: UsageSummary;
  topModels: UsageEntry[];
  topKeys: UsageEntry[];
}) {
  return (
    <section className="clay-panel space-y-4 rounded-3xl p-5 text-sm">
      <div>
        <p className="font-medium">Usage Metrics</p>
        <p className="text-vetra-ink/70">
          {summary.totalRequests} requests • {summary.totalTokens} tokens • {summary.periodLabel}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="font-medium">Top models</p>
          {topModels.length === 0 ? (
            <p className="text-vetra-ink/70">No usage yet.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-vetra-ink/70">
              {topModels.map((model, index) => (
                <li key={`${model.label}-${index}`} className="flex justify-between">
                  <span>{model.label}</span>
                  <span>{model.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="font-medium">Top API keys</p>
          {topKeys.length === 0 ? (
            <p className="text-vetra-ink/70">No key usage yet.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-vetra-ink/70">
              {topKeys.map((key, index) => (
                <li key={`${key.label}-${index}`} className="flex justify-between">
                  <span>{key.label}</span>
                  <span>{key.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
