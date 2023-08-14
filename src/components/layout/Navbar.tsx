import Link from 'next/link';

import UserDropdown from '~/components/UserDropdown';
import { getUser } from '~/server/user';

const Navbar = async () => {
  const user = await getUser();

  return (
    <header className="col-span-2 row-start-1 self-center border-b">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-2">
        <div>
          <h1 className="text-xl font-bold text-red-500">
            <Link href="/">CapturCMS</Link>
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="text-zinc-300 hover:text-zinc-400">
            Dashboard
          </Link>
        </div>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};

export default Navbar;
