import { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm">{children}</div>;
}
