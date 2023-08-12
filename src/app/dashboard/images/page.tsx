import Link from 'next/link';

import { getAllUserImages } from '~/server/image';

const Images = async () => {
  const images = await getAllUserImages();

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="columns-3 gap-2 space-y-2">
        {images?.map((image) => (
          <div key={image.fileKey} className="relative">
            <img src={image.fileUrl} alt="" className="rounded-md" />
            <Link
              href={`/dashboard/images/${image.id}`}
              prefetch={false}
              className="absolute right-4 top-4 rounded-md bg-red-500 p-2 transition-transform hover:bg-red-600 active:scale-95"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Images;
