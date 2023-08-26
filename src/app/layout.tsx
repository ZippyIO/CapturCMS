import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Providers } from '~/components/Providers';
import { Toaster } from '~/components/ui/Toaster';
import { cn } from '~/lib/utils';

type Props = {
  children: React.ReactNode;
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'DuttoMedia',
  icons: {
    icon: '/ico/favicon.ico',
  },
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className)}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
