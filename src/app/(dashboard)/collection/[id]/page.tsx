import ImageCard from '~/components/shared/ImageCard';
import { getImageCollection } from '~/server/image-collection';

const Collection = async ({ params }: { params: { id: string } }) => {
  const collection = await getImageCollection(params.id, true);

  return (
    <main className="flex flex-col items-center justify-between gap-2 p-8">
      <div className="flex w-full flex-col items-center rounded-md bg-zinc-900/50 py-1.5">
        <h2 className="text-2xl font-semibold text-zinc-300">{collection?.name}</h2>
        <p className="text-sm font-light text-zinc-400">{collection?.description}</p>
      </div>
      <div className="columns-3 gap-2 space-y-2">
        {collection?.images?.map((image) => (
          <ImageCard
            key={image.fileKey}
            id={image.id}
            href={image.fileUrl}
            name={image.name ?? ''}
            collectionName={collection.name}
          />
        ))}
      </div>
    </main>
  );
};

export const dynamic = 'force-dynamic';
export default Collection;
