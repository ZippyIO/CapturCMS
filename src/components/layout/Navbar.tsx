'use client';

import { Aperture } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '~/lib/utils';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-col items-center justify-between gap-1 p-2">
      <div className="text-center">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extralight leading-tight text-zinc-300">
          <Aperture size={32} className="rounded-full text-blue-500" /> DuttoMedia
        </h1>
      </div>
      <div>
        <nav className="flex gap-2">
          <Link
            href="/"
            className={cn(pathname === '/' ? 'text-blue-500' : 'text-zinc-400', 'uppercase')}
          >
            Collections
          </Link>
          <Link
            href="/about"
            className={cn(pathname === '/about' ? 'text-blue-500' : 'text-zinc-400', 'uppercase')}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(pathname === '/contact' ? 'text-blue-500' : 'text-zinc-400', 'uppercase')}
          >
            Contact
          </Link>
        </nav>
      </div>
      <div />
      <div className="w-full border-b" />
    </header>
  );
};

export default Navbar;
