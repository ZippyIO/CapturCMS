import ImageEditModal from '~/components/ImageEditModal';
import { getImage } from '~/server/image';
import { getAllUserImageCollections } from '~/server/image-collection';

const Image = async ({ params }: { params: { id: string } }) => {
  const image = await getImage(params.id);
  const collections = await getAllUserImageCollections();

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="relative">
        {image && <img src={image.fileUrl} alt="" className="rounded-md" />}
        {image && collections && <ImageEditModal image={image} collections={collections} />}
      </div>
    </main>
  );
};

export default Image;
