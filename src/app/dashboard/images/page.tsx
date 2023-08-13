import { Album } from 'lucide-react';
import Link from 'next/link';

import { Button } from '~/components/ui/Button';
import { getAllUserImages } from '~/server/image';

const Images = async () => {
  const images = await getAllUserImages();

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="columns-3 gap-2 space-y-2">
        {images?.map((image) => (
          <div key={image.fileKey} className="relative">
            <img src={image.fileUrl} alt="" className="rounded-md" />
            <Button className="absolute right-4 top-4 bg-zinc-900/50 transition-transform hover:bg-zinc-950/50 active:scale-95">
              <Link href={`/dashboard/images/${image.id}`} prefetch={false} className="">
                Open
              </Link>
            </Button>
            <div className="absolute bottom-0 flex w-full flex-col gap-0.5 rounded-b-md bg-zinc-900/70 py-1 pl-2">
              <p className="text-sm font-medium">{image?.name}</p>
              {image?.collection && (
                <p className="flex items-center gap-1 text-xs text-zinc-500">
                  <Album size={16} />
                  <span>{image?.collection.name}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Images;
