'use client';

import { type Image as PrismaImage } from '@prisma/client';

import { useMemo, useState } from 'react';

import ImageCard from '~/components/shared/ImageCard';
import { Input } from '~/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/Select';

interface Collection {
  name: string;
}

interface Image extends PrismaImage {
  collection: Collection | null;
}

interface Props {
  images: Image[];
  collectionNames: {
    name: string;
  }[];
}

const ImagesContainer = ({ images, collectionNames }: Props) => {
  const [search, setSearch] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');

  const filteredImagesByCollections = useMemo(() => {
    if (selectedCollection === 'all') return images;

    return images.filter((image) => image.collection?.name?.toLowerCase() === selectedCollection);
  }, [images, selectedCollection]);

  const filteredImages = useMemo(() => {
    if (!search) return filteredImagesByCollections;

    return filteredImagesByCollections.filter(
      (image) => image.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [filteredImagesByCollections, search]);

  return (
    <>
      <div className="flex w-full justify-center gap-2 rounded-md bg-zinc-900/50 px-1.5 py-1.5">
        <Input
          name="description"
          placeholder="Search"
          type="text"
          className="w-3/4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={selectedCollection} onValueChange={setSelectedCollection}>
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter Collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {collectionNames.map((collection) => (
              <SelectItem key={collection.name} value={collection.name.toLowerCase()}>
                {collection.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
