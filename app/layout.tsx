import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { Routes } from '@/constants/endpoints';
import { Toaster } from '@/components/ui/toaster';

const IBMPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
});

export const metadata: Metadata = {
  title: 'Pixel Perfect',
  description: 'Media generator powered by AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{ variables: { colorPrimary: '#4aea9a' } }}
      afterSignInUrl={Routes.dashboard}
      afterSignUpUrl={Routes.dashboard}
    >
      <html lang="pl">
        <body className={cn('font-IBMPlex antialiased', IBMPlex.variable)}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
