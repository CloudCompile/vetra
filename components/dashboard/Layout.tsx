import { PropsWithChildren } from 'react';

export function DashboardLayout({ children }: PropsWithChildren) {
  return <section className="mx-auto w-full max-w-6xl px-4 py-8">{children}</section>;
}
