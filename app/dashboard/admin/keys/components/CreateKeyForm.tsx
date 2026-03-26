'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type PlanOption = { id: string; name: string };

export function CreateKeyForm({
  plans = [],
  showPlanPicker = false,
  showUserIdField = false,
}: {
  plans?: PlanOption[];
  showPlanPicker?: boolean;
  showUserIdField?: boolean;
}) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [planId, setPlanId] = useState(plans[0]?.id ?? '');
  const [userId, setUserId] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/v1/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          ...(showPlanPicker && planId ? { planId } : {}),
          ...(showUserIdField && userId ? { userId } : {}),
          ...(expiresAt ? { expiresAt: new Date(expiresAt).toISOString() } : {}),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setResult(payload?.error ? `Error: ${payload.error}` : 'Error creating key.');
        return;
      }

      setResult(
        `Created key: ${payload?.data?.name ?? 'Unnamed'} • ${payload?.data?.key ?? 'no-key-returned'}`,
      );
      setName('');
      setPlanId(plans[0]?.id ?? '');
      setUserId('');
      setExpiresAt('');
      router.refresh();
    } catch {
      setResult('Network error creating key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="clay-panel space-y-3 rounded-3xl p-5">
      <h3 className="font-medium">Create API Key</h3>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Key name" required />
      {showPlanPicker ? (
        <label className="text-xs text-vetra-ink/70">
          Plan
          <select
            className="clay-input mt-1 w-full rounded-2xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vetra-accent/40"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            required
          >
            {plans.length === 0 ? <option value="">No plans available</option> : null}
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {showUserIdField ? (
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Assign to user ID (optional)"
        />
      ) : null}
      <Input value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} type="datetime-local" />
      <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
      {result ? <p className="text-xs text-vetra-ink/70">{result}</p> : null}
    </form>
  );
}
