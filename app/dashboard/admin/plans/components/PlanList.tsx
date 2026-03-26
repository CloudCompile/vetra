interface Plan {
  id: string;
  name: string;
  monthlyQuota: number;
  rateLimit: number;
}

export function PlanList({ plans }: { plans: Plan[] }) {
  if (plans.length === 0) return <p className="text-sm text-slate-500">No plans yet.</p>;

  return (
    <ul className="space-y-2">
      {plans.map((plan) => (
        <li key={plan.id} className="rounded border border-slate-200 p-3 text-sm">
          <p className="font-medium">{plan.name}</p>
          <p className="text-slate-500">Quota: {plan.monthlyQuota} • Rate: {plan.rateLimit}/min</p>
        </li>
      ))}
    </ul>
  );
}
