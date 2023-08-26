import CollectionsNavbar from '~/components/layout/CollectionsNavbar';
import { getAllImageCollectionIds } from '~/server/image-collection';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const collections = await getAllImageCollectionIds();

  return (
    <div className="p-8 pt-0">
      <CollectionsNavbar collections={collections} />
      {children}
    </div>
  );
};

export default Layout;
