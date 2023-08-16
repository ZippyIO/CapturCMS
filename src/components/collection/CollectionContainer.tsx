'use client';

import { type Image, type ImageCollection } from '@prisma/client';

import { useMemo, useState } from 'react';
import CollectionEditModal from '~/components/collection/CollectionEditModal';

import ImageCard from '~/components/shared/ImageCard';
import { Input } from '~/components/ui/Input';

interface Collection extends ImageCollection {
  images: Image[];
}

interface Props {
  collection: Collection;
}

const CollectionContainer = ({ collection }: Props) => {
  const [search, setSearch] = useState('');

  const filteredImages = useMemo(() => {
    if (!search) return collection?.images;

    return collection?.images.filter(
      (image) => image.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [collection?.images, search]);

  return (
    <>
      <div className="relative flex w-full flex-col items-center rounded-md bg-zinc-900/50 py-1.5">
        <h2 className="text-2xl font-semibold text-zinc-300">{collection?.name}</h2>
        <p className="text-sm font-light text-zinc-400">{collection?.description}</p>
        <Input
          name="description"
          placeholder="Search"
          type="text"
          className="mt-2 w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <CollectionEditModal
          id={collection.id}
          name={collection.name}
          description={collection.description ?? undefined}
        />
      </div>
      <div className="columns-3 gap-2 space-y-2">
        {filteredImages?.map((image) => (
          <ImageCard
            key={image.fileKey}
            id={image.id}
            href={image.fileUrl}
            name={image.name ?? ''}
            collectionName={collection.name}
          />
        ))}
      </div>
    </>
  );
};

export default CollectionContainer;
