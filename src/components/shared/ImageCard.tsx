'use client';

import { Album } from 'lucide-react';
import Link from 'next/link';

import { Button } from '~/components/ui/Button';

interface Props {
  id: string;
  href: string;
  name: string;
  collectionName: string;
}

const ImageCard = ({ id, href, name, collectionName }: Props) => {
  return (
    <div className="relative">
      <img src={href} alt="" className="rounded-md" />
      <Button className="absolute right-4 top-4 bg-zinc-900/50 transition-transform hover:bg-zinc-950/50 active:scale-95">
        <Link href={`/dashboard/images/id/${id}`} prefetch={false} className="">
          Open
        </Link>
      </Button>
      <div className="absolute bottom-0 flex w-full flex-col gap-0.5 rounded-b-md bg-zinc-900/70 py-1 pl-2">
        <p className="text-sm font-medium">{name}</p>
        <p className="flex items-center gap-1 text-xs text-zinc-500">
          <Album size={16} />
          <span>{collectionName}</span>
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
