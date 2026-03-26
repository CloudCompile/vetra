import { PropsWithChildren } from 'react';

export function VetraTheme({ children }: PropsWithChildren) {
  return <div className="vetra-theme min-h-screen bg-vetra-bg text-vetra-ink">{children}</div>;
}
