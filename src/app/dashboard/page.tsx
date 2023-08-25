import { getImageCount, getImagesTotalSize } from '~/server/image';
import { getImageCollectionCount } from '~/server/image-collection';

const Dashboard = async () => {
  const imageCollectionCount = await getImageCollectionCount();
  const imageCount = await getImageCount();
  const imagesTotalSize = await getImagesTotalSize();

  function bytesToMB(bytes: number) {
    return bytes / (1024 * 1024);
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="bg rounded-md bg-zinc-900/50 p-2 text-center">
        <p className="text-xl font-bold text-zinc-300">Image Collections</p>
        <p className="text-2xl font-extrabold text-red-500">{imageCollectionCount}</p>
      </div>
      <div className="bg rounded-md bg-zinc-900/50 p-2 text-center">
        <p className="text-xl font-bold text-zinc-300">Storage</p>
        <p className="text-2xl font-extrabold text-red-500">
          {bytesToMB(imagesTotalSize ?? 0).toFixed(2)}MB
        </p>
      </div>
      <div className="bg rounded-md bg-zinc-900/50 p-2 text-center">
        <p className="text-xl font-bold text-zinc-300">Images</p>
        <p className="text-2xl font-extrabold text-red-500">{imageCount}</p>
      </div>
    </main>
  );
};

export default Dashboard;
