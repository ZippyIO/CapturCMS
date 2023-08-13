import { type Image, type ImageCollection as PrismaImageCollection } from '@prisma/client';

import { Album } from 'lucide-react';
import Link from 'next/link';

import { Button } from '~/components/ui/Button';
import { getBaseUrl } from '~/lib/utils';

interface ImageCollection extends PrismaImageCollection {
  images: Image[];
}

const getCollection = async (id: string) => {
  const res = await fetch(`${getBaseUrl()}/api/collection?id=${id}&complete=true`, {
    method: 'GET',
  });

  return res.json() as unknown as ImageCollection;
};

const Collection = async ({ params }: { params: { id: string } }) => {
  const collection = await getCollection(params.id);

  return (
    <main className="flex flex-col items-center justify-between gap-2 p-8">
      <div className="flex w-full flex-col items-center rounded-md bg-zinc-900/50 py-1.5">
        <h2 className="text-2xl font-semibold text-zinc-300">{collection?.name}</h2>
        <p className="text-sm font-light text-zinc-400">{collection?.description}</p>
      </div>
      <div className="columns-3 gap-2 space-y-2">
        {collection?.images?.map((image) => (
          <div key={image.fileKey} className="relative">
            <img src={image.fileUrl} alt="" className="rounded-md" />
            <Button className="absolute right-4 top-4 bg-zinc-900/50 transition-transform hover:bg-zinc-950/50 active:scale-95">
              <Link href={`/dashboard/images/${image.id}`} prefetch={false} className="">
                Open
              </Link>
            </Button>
            <div className="absolute bottom-0 flex w-full flex-col gap-0.5 rounded-b-md bg-zinc-900/70 py-1 pl-2">
              <p className="text-sm font-medium">{image?.name}</p>
              <p className="flex items-center gap-1 text-xs text-zinc-500">
                <Album size={16} />
                <span>{collection.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Collection;
