'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function CreateKeyForm() {
  const [name, setName] = useState('');
  const [planId, setPlanId] = useState('');
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
          planId,
          ...(expiresAt ? { expiresAt: new Date(expiresAt).toISOString() } : {}),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setResult(payload?.error ? `Error: ${payload.error}` : 'Error creating key.');
        return;
      }

      setResult(`Created key: ${payload?.data?.name ?? 'Unnamed'} (${payload?.data?.id ?? 'no-id'})`);
      setName('');
      setPlanId('');
      setExpiresAt('');
    } catch {
      setResult('Network error creating key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded border border-slate-200 p-4">
      <h3 className="font-medium">Create API Key</h3>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Key name" required />
      <Input value={planId} onChange={(e) => setPlanId(e.target.value)} placeholder="Plan ID" required />
      <Input value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} type="datetime-local" />
      <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
      {result ? <p className="text-xs text-slate-500">{result}</p> : null}
    </form>
  );
}
