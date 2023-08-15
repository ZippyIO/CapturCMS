import ImageCollectionForm from '~/components/ImageCollectionForm';
import { getAllUserImages } from '~/server/image';

const NewCollection = async () => {
  const images = await getAllUserImages();
  return <ImageCollectionForm images={images} />;
};

export default NewCollection;
