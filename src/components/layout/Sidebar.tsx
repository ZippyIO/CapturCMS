'use client';

import { Camera, Layers, LayoutDashboard, Wrench } from 'lucide-react';

import SidebarLink from '~/components/layout/SidebarLink';

const Sidebar = () => {
  return (
    <div className="flex  w-[250px] flex-col gap-2 border-r pl-4 pt-4">
      <ul className="flex flex-col gap-2">
        <SidebarLink Icon={LayoutDashboard} href="/dashboard">
          Dashboard
        </SidebarLink>
        <SidebarLink Icon={Layers} href="/collections">
          Collections
        </SidebarLink>
        <SidebarLink Icon={Camera} href="/images">
          Images
        </SidebarLink>
        <SidebarLink Icon={Wrench} href="/settings">
          Settings
        </SidebarLink>
      </ul>
    </div>
  );
};

export default Sidebar;
