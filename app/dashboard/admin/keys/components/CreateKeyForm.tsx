'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function CreateKeyForm() {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('Submit against /api/v1/keys with admin auth in your environment.');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded border border-slate-200 p-4">
      <h3 className="font-medium">Create API Key</h3>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Key name" required />
      <Button type="submit">Create</Button>
      {result ? <p className="text-xs text-slate-500">{result}</p> : null}
    </form>
  );
}
