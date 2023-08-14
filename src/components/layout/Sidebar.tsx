'use client';

import { Camera, Layers, LayoutDashboard, Wrench } from 'lucide-react';
import { usePathname } from 'next/navigation';

import SidebarLink from '~/components/layout/SidebarLink';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="col-span-1 row-start-2 flex w-[250px] flex-shrink-0 flex-col gap-2 border-r pl-4 pt-4">
      <ul className="flex flex-col gap-2">
        <SidebarLink Icon={LayoutDashboard} href="/" pathname={pathname}>
          Dashboard
        </SidebarLink>
        <SidebarLink Icon={Layers} href="/collections" pathname={pathname}>
          Collections
        </SidebarLink>
        <SidebarLink Icon={Camera} href="/images" pathname={pathname}>
          Images
        </SidebarLink>
        <SidebarLink Icon={Wrench} href="/settings" pathname={pathname}>
          Settings
        </SidebarLink>
      </ul>
    </div>
  );
};

export default Sidebar;
