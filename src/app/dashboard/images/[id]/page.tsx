import ImageEditModal from '~/components/form/ImageEditModal';
import { getImage } from '~/server/image';
import { getAllImageCollections } from '~/server/image-collection';

const Image = async ({ params }: { params: { id: string } }) => {
  const image = await getImage(params.id);
  const collections = await getAllImageCollections();

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="relative">
        {image && <img src={image.fileUrl} alt="" />}
        {image && collections && <ImageEditModal image={image} collections={collections} />}
      </div>
    </main>
  );
};

export default Image;
