import { getAllUserImages } from '~/server/image';

const Images = async () => {
  const images = await getAllUserImages();

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="columns-3 gap-2 space-y-2">
        {images?.map((image) => (
          <img key={image.fileKey} src={image.fileUrl} alt="" className="rounded-md" />
        ))}
      </div>
    </main>
  );
};

export default Images;
