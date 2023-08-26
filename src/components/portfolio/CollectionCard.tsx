'use client';

import Link from 'next/link';

interface Props {
  id: string;
  href?: string;
  name: string;
}

const CollectionCard = ({ id, href, name }: Props) => {
  return (
    <Link href={`/collections/${id}`} prefetch={false}>
      <div className="relative flex h-[500px] w-[300px] flex-col items-center justify-between overflow-hidden rounded-md bg-zinc-900">
        {href && (
          <img
            src={href}
            alt=""
            className="h-[500px] w-[300px] rounded-md object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
        <div className="absolute bottom-0 w-full rounded-b-md bg-zinc-900/60 text-center">
          <h2 className="text-2xl font-light uppercase">{name}</h2>
          <p className="text-sm font-extralight">COLLECTION</p>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
