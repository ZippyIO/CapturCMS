import DashboardNavbar from '~/components/layout/DashboardNavbar';
import DashboardSidebar from '~/components/layout/DashboardSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-[250px_1fr] grid-rows-[50px_1fr]">
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="col-start-2 row-start-2">{children}</div>
    </div>
  );
}
