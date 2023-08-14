import { type Image, type ImageCollection as PrismaImageCollection } from '@prisma/client';

import Link from 'next/link';

import ImageCollectionForm from '~/components/ImageCollectionForm';
import { Button } from '~/components/ui/Button';
import { getBaseUrl } from '~/lib/utils';

interface ImageCollection extends PrismaImageCollection {
  images: Image[];
}

const getCollections = async () => {
  const res = await fetch(`${getBaseUrl()}/api/collections`, {
    method: 'GET',
  });

  return res.json() as unknown as ImageCollection[];
};

const Collections = async () => {
  const collections = await getCollections();
  return (
    <main className="flex flex-col items-center justify-between gap-2 p-8">
      <div className="columns-3 gap-2 space-y-2">
        {collections?.map((collection) => (
          <div
            key={collection.id}
            className="relative flex h-[500px] w-[300px] flex-col items-center justify-between rounded-md bg-zinc-900"
          >
            {collection.images[0] && (
              <img
                src={collection.images[0].fileUrl}
                alt=""
                className="h-[500px] w-[300px] rounded-md object-fill"
              />
            )}
            <Button className="absolute right-4 top-4 bg-zinc-900/50 transition-transform hover:bg-zinc-950/50 active:scale-95">
              <Link href={`/collection/${collection.id}`} prefetch={false} className="">
                Open
              </Link>
            </Button>
            <div className="absolute bottom-0 w-full rounded-b-md bg-zinc-900/50 py-1 pl-2">
              <p className="text-xl font-medium">{collection.name}</p>
            </div>
          </div>
        ))}
      </div>
      <ImageCollectionForm />
    </main>
  );
};

export default Collections;
