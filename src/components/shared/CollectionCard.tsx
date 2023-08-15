'use client';

import Link from 'next/link';

import { Button } from '~/components/ui/Button';

interface Props {
  id: string;
  href?: string;
  name: string;
}

const CollectionCard = ({ id, href, name }: Props) => {
  return (
    <div
      key={id}
      className="relative flex h-[500px] w-[300px] flex-col items-center justify-between rounded-md bg-zinc-900"
    >
      {href && <img src={href} alt="" className="h-[500px] w-[300px] rounded-md object-cover" />}
      <Button className="absolute right-4 top-4 bg-zinc-900/50 transition-transform hover:bg-zinc-950/50 active:scale-95">
        <Link href={`/collections/id/${id}`} prefetch={false} className="">
          Open
        </Link>
      </Button>
      <div className="absolute bottom-0 w-full rounded-b-md bg-zinc-900/70 py-1 pl-2">
        <p className="text-xl font-medium">{name}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
