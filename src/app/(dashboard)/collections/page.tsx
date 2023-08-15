import CollectionCard from '~/components/shared/CollectionCard';
import { getAllImageCollections } from '~/server/image-collection';

const Collections = async () => {
  const collections = await getAllImageCollections(false);

  return (
    <main className="flex flex-col items-center justify-center gap-2 p-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {collections?.map((collection) => (
          <CollectionCard
            key={collection.id}
            id={collection.id}
            href={collection.images[0]?.fileUrl}
            name={collection.name}
          />
        ))}
      </div>
    </main>
  );
};

export const dynamic = 'force-dynamic';
export default Collections;
