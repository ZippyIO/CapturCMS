'use client';

import { type User } from '@prisma/client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getUser } from '~/server/user';

const Navbar = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    getUser().then((res) => setUser(res));
  }, []);

  return (
    <header className="col-span-2 row-start-1 self-center border-b">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-2">
        <div>
          <h1 className="text-xl font-bold text-red-500">
            <Link href="/">CapturCMS</Link>
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div>{user && <p>{user.name}</p>}</div>
      </div>
    </header>
  );
};

export default Navbar;
