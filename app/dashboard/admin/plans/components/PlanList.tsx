interface Plan {
  id: string;
  name: string;
  slug: string;
  monthlyQuota: number;
  rateLimit: number;
  maxTokens: number;
  priceInCents: number;
  isActive: boolean;
  allowedModels: string[];
}

export function PlanList({ plans }: { plans: Plan[] }) {
  if (plans.length === 0) return <p className="text-sm text-slate-500">No plans yet.</p>;

  return (
    <ul className="space-y-2">
      {plans.map((plan) => (
        <li key={plan.id} className="rounded border border-slate-200 p-3 text-sm">
          <p className="font-medium">{plan.name}</p>
          <p className="text-slate-500">Slug: {plan.slug}</p>
          <p className="text-slate-500">
            Quota: {plan.monthlyQuota} • Rate: {plan.rateLimit}/min • Max tokens: {plan.maxTokens}
          </p>
          <p className="text-slate-500">
            Price: ${(plan.priceInCents / 100).toFixed(2)} • Status: {plan.isActive ? 'Active' : 'Inactive'}
          </p>
          {plan.allowedModels.length > 0 ? (
            <p className="text-slate-500">Models: {plan.allowedModels.join(', ')}</p>
          ) : (
            <p className="text-slate-500">Models: All</p>
          )}
        </li>
      ))}
    </ul>
  );
}
