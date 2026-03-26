'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function PlanEditor() {
  const [name, setName] = useState('');

  return (
    <section className="space-y-3 rounded border border-slate-200 p-4">
      <h3 className="font-medium">Create Plan</h3>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Plan name" />
      <Button type="button">Save Plan</Button>
    </section>
  );
}
