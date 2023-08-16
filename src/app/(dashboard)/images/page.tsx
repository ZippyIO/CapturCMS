import ImagesContainer from '~/components/image/ImagesContainer';
import { getAllUserImages } from '~/server/image';

const Images = async () => {
  const images = await getAllUserImages();

  return (
    <main className="flex flex-col items-center justify-between gap-2 p-8">
      {images && <ImagesContainer images={images} />}
    </main>
  );
};

export const dynamic = 'force-dynamic';
export default Images;
