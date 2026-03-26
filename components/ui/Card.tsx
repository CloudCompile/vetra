import { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return <div className="clay-card rounded-3xl p-5">{children}</div>;
}
