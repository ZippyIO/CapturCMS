'use client';

import { Camera, Layers, LayoutDashboard, Wrench } from 'lucide-react';
import { usePathname } from 'next/navigation';

import SidebarLink from '~/components/layout/SidebarLink';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex w-[250px] flex-shrink-0 flex-col gap-2 border-r pl-4 pt-4">
      <ul className="flex flex-col gap-2">
        <SidebarLink Icon={LayoutDashboard} href="/dashboard" pathname={pathname}>
          Dashboard
        </SidebarLink>
        <SidebarLink Icon={Layers} href="/dashboard/collections" pathname={pathname}>
          Collections
        </SidebarLink>
        <SidebarLink Icon={Camera} href="/dashboard/images" pathname={pathname}>
          Images
        </SidebarLink>
        <SidebarLink Icon={Wrench} href="/dashboard/settings" pathname={pathname}>
          Settings
        </SidebarLink>
      </ul>
    </div>
  );
};

export default Sidebar;
