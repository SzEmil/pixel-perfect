import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { Routes } from '@/constants/endpoints';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/app/providers';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const IBMPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
});

export const metadata: Metadata = {
  title: 'Pixel Perfect',
  description: 'Media generator powered by AI',
};

export default async function RootLayout({
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
      <html lang="en">
        <body className={cn('font-IBMPlex antialiased', IBMPlex.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
          >
            <main>{children}</main>
            <Toaster />
            <Suspense>
              <ThemeSwitcher />
            </Suspense>
          </ThemeProvider>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
