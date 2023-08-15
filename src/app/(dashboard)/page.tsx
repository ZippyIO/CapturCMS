import ImageForm from '~/components/ImageForm';
import { getAllImageCollections } from '~/server/image-collection';

const Dashboard = async () => {
  const collections = await getAllImageCollections();

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {collections && <ImageForm collections={collections} />}
    </main>
  );
};

export default Dashboard;
