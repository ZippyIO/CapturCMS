import ImageForm from '~/components/form/ImageForm';
import { getAllImageCollections } from '~/server/image-collection';

const NewImage = async () => {
  const collections = await getAllImageCollections();

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {collections && <ImageForm collections={collections} />}
    </main>
  );
};

export default NewImage;
