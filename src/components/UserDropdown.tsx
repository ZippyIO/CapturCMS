'use client';

import { type User } from '@prisma/client';

import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/DropdownMenu';

interface Props {
  user?: User;
}

const UserDropdown = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full border-[3px] border-blue-500 transition hover:border-blue-600 hover:opacity-90 focus:outline-none">
        <img src={user?.image ?? ''} alt="" className="h-8 w-8 rounded-full transition-transform" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-normals flex items-center gap-2 text-xs text-zinc-400">
          <img src={user?.image ?? ''} alt="" className="h-8 w-8 rounded-full" />
          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer bg-red-700/20 text-red-500"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
