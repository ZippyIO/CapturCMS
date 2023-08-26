'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '~/lib/utils';

type Props = {
  collections: { id: string }[];
};

const CollectionsNavbar = ({ collections }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-shrink-0 justify-center gap-4 pb-4">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/collections/${collection.id}`}
          prefetch={false}
          className={cn(
            pathname === `/collections/${collection.id}` ? 'text-blue-500' : 'text-zinc-300',
            'uppercase',
          )}
        >
          {collection.id}
        </Link>
      ))}
    </div>
  );
};

export default CollectionsNavbar;
