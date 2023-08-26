import ImageCard from '~/components/portfolio/ImageCard';
import { getImageCollection } from '~/server/image-collection';

type Props = {
  params: {
    id: string;
  };
};

const Collection = async ({ params }: Props) => {
  const collection = await getImageCollection(params.id, true);

  return (
    <main className="flex flex-col items-center justify-center gap-2">
      <div className="columns-1 gap-2 space-y-2 md:columns-2 lg:columns-3 xl:columns-4">
        {collection?.images.map((image) => (
          <ImageCard key={image.id} href={image.fileUrl} name={image.name ?? ''} />
        ))}
      </div>
    </main>
  );
};

export default Collection;
