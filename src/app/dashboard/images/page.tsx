import ImagesContainer from '~/components/image/ImagesContainer';
import { getAllUserImages } from '~/server/image';
import { getAllImageCollectionNames } from '~/server/image-collection';

const Images = async () => {
  const images = await getAllUserImages();
  const imageCollectionNames = await getAllImageCollectionNames();

  return (
    <main className="flex flex-col items-center justify-between gap-2 p-8">
      {images && imageCollectionNames && (
        <ImagesContainer images={images} collectionNames={imageCollectionNames} />
      )}
    </main>
  );
};

export const dynamic = 'force-dynamic';
export default Images;
