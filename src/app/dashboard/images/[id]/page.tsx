import { getImage } from '~/server/image';

const Image = async ({ params }: { params: { id: string } }) => {
  const image = await getImage(params.id);

  return (
    <main className="flex flex-col items-center justify-between p-8">
      {image && <img src={image.fileUrl} alt="" className="rounded-md" />}
    </main>
  );
};

export default Image;
