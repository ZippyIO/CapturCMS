import CollectionContainer from '~/components/collection/CollectionContainer';
import { stringToId } from '~/lib/utils';
import { getImageCollection } from '~/server/image-collection';

const Collection = async ({ params }: { params: { id: string } }) => {
  const collection = await getImageCollection(stringToId(params.id), true);

  return (
    <main className="flex flex-col items-center justify-between gap-2 p-8">
      {collection && <CollectionContainer collection={collection} />}
    </main>
  );
};

export const dynamic = 'force-dynamic';
export default Collection;
