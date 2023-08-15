import ImageCard from '~/components/shared/ImageCard';
import { getAllUserImages } from '~/server/image';

const Images = async () => {
  const images = await getAllUserImages();

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="columns-3 gap-2 space-y-2">
        {images?.map((image) => (
          <ImageCard
            key={image.fileKey}
            id={image.id}
            href={image.fileUrl}
            name={image.name ?? ''}
            collectionName={image.collection?.name ?? ''}
          />
        ))}
      </div>
    </main>
  );
};

export const dynamic = 'force-dynamic';
export default Images;
