import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '~/components/Providers';
import { cn } from '~/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: '/ico/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
