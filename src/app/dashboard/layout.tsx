import Navbar from '~/components/layout/Navbar';
import Sidebar from '~/components/layout/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-[250px_1fr] grid-rows-[50px_1fr]">
      <Navbar />
      <Sidebar />
      <div className="col-start-2 row-start-2">{children}</div>
    </div>
  );
}
