import { PropsWithChildren } from 'react';
import { DashboardLayout } from '@/components/dashboard/Layout';

export default function Layout({ children }: PropsWithChildren) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
