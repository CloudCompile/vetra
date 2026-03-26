'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function PlanEditor() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [monthlyQuota, setMonthlyQuota] = useState('1000');
  const [rateLimit, setRateLimit] = useState('10');
  const [maxTokens, setMaxTokens] = useState('2000');
  const [allowedModels, setAllowedModels] = useState('');
  const [features, setFeatures] = useState('');
  const [priceInCents, setPriceInCents] = useState('0');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/v1/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          description: description || undefined,
          monthlyQuota: Number(monthlyQuota),
          rateLimit: Number(rateLimit),
          maxTokens: Number(maxTokens),
          allowedModels: allowedModels
            ? allowedModels.split(',').map((model) => model.trim()).filter(Boolean)
            : [],
          features: features
            ? features.split(',').map((feature) => feature.trim()).filter(Boolean)
            : [],
          priceInCents: Number(priceInCents),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setResult(payload?.error ? `Error: ${payload.error}` : 'Error creating plan.');
        return;
      }

      setResult(`Created plan: ${payload?.data?.name ?? 'Unnamed'}`);
      setName('');
      setSlug('');
      setDescription('');
      setMonthlyQuota('1000');
      setRateLimit('10');
      setMaxTokens('2000');
      setAllowedModels('');
      setFeatures('');
      setPriceInCents('0');
      router.refresh();
    } catch {
      setResult('Network error creating plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded border border-slate-200 p-4">
      <h3 className="font-medium">Create Plan</h3>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Plan name" required />
      <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" required />
      <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <Input
        value={monthlyQuota}
        onChange={(e) => setMonthlyQuota(e.target.value)}
        placeholder="Monthly quota"
        type="number"
        min={1}
      />
      <Input
        value={rateLimit}
        onChange={(e) => setRateLimit(e.target.value)}
        placeholder="Rate limit per minute"
        type="number"
        min={1}
      />
      <Input
        value={maxTokens}
        onChange={(e) => setMaxTokens(e.target.value)}
        placeholder="Max tokens per request"
        type="number"
        min={1}
      />
      <Input
        value={allowedModels}
        onChange={(e) => setAllowedModels(e.target.value)}
        placeholder="Allowed models (comma separated)"
      />
      <Input
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
        placeholder="Features (comma separated)"
      />
      <Input
        value={priceInCents}
        onChange={(e) => setPriceInCents(e.target.value)}
        placeholder="Price in cents"
        type="number"
        min={0}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Plan'}
      </Button>
      {result ? <p className="text-xs text-slate-500">{result}</p> : null}
    </form>
  );
}
