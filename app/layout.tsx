import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { VetraTheme } from '@/components/branding/VetraTheme';

export const metadata: Metadata = {
  title: 'Vetra',
  description: 'Storm-calm AI inference API and admin dashboard',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <ClerkProvider>
          <VetraTheme>{children}</VetraTheme>
        </ClerkProvider>
      </body>
    </html>
  );
}
