import ImageCollectionForm from '~/components/form/ImageCollectionForm';
import { getAllUserImages } from '~/server/image';

const NewCollection = async () => {
  const images = await getAllUserImages();
  return <ImageCollectionForm images={images} />;
};

export default NewCollection;
