import { type Metadata } from 'next';

import DashboardNavbar from '~/components/layout/DashboardNavbar';
import DashboardSidebar from '~/components/layout/DashboardSidebar';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'CapturCMS',
};

const Layout = ({ children }: Props) => {
  return (
    <div className="grid h-screen grid-cols-[250px_1fr] grid-rows-[50px_1fr]">
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="col-start-2 row-start-2">{children}</div>
    </div>
  );
};

export default Layout;
