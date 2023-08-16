'use client';

import { type Image as PrismaImage } from '@prisma/client';

import { useMemo, useState } from 'react';

import ImageCard from '~/components/shared/ImageCard';
import { Input } from '~/components/ui/Input';

interface Collection {
  name: string;
}

interface Image extends PrismaImage {
  collection: Collection | null;
}

interface Props {
  images: Image[];
}

const ImagesContainer = ({ images }: Props) => {
  const [search, setSearch] = useState('');

  const filteredImages = useMemo(() => {
    if (!search) return images;

    return images.filter((image) => image.name?.toLowerCase().includes(search.toLowerCase()));
  }, [images, search]);

  return (
    <>
      <div className="flex w-full flex-col items-center rounded-md bg-zinc-900/50 py-1.5">
        <Input
          name="description"
          placeholder="Search"
          type="text"
          className="w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="columns-3 gap-2 space-y-2">
        {filteredImages?.map((image) => (
          <ImageCard
            key={image.fileKey}
            id={image.id}
            href={image.fileUrl}
            name={image.name ?? ''}
            collectionName={image.collection?.name ?? ''}
          />
        ))}
      </div>
    </>
  );
};

export default ImagesContainer;
