import Link from 'next/link';

import { Button } from '~/components/ui/Button';
import { getAllImageCollections } from '~/server/image-collection';

const Collections = async () => {
  const collections = await getAllImageCollections(false);

  return (
    <main className="flex flex-col items-center justify-center gap-2 p-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {collections?.map((collection) => (
          <div
            key={collection.id}
            className="relative flex h-[500px] w-[300px] flex-col items-center justify-between rounded-md bg-zinc-900"
          >
            {collection.images[0] && (
              <img
                src={collection.images[0].fileUrl}
                alt=""
                className="h-[500px] w-[300px] rounded-md object-cover"
              />
            )}
            <Button className="absolute right-4 top-4 bg-zinc-900/50 transition-transform hover:bg-zinc-950/50 active:scale-95">
              <Link href={`/collection/${collection.id}`} prefetch={false} className="">
                Open
              </Link>
            </Button>
            <div className="absolute bottom-0 w-full rounded-b-md bg-zinc-900/70 py-1 pl-2">
              <p className="text-xl font-medium">{collection.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Collections;
