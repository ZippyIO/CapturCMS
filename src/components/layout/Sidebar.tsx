'use client';

import { Camera, Layers, LayoutDashboard, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SidebarLink from '~/components/layout/SidebarLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="col-span-1 row-span-2 flex w-[250px] flex-shrink-0 flex-col gap-4 border-r px-4 pt-2">
      <div className="">
        <h1 className="text-2xl font-bold text-red-500">
          <Link href="/">CapturCMS</Link>
        </h1>
      </div>
      <ul className="flex flex-col gap-1">
        <SidebarLink Icon={LayoutDashboard} href="/" pathname={pathname}>
          Dashboard
        </SidebarLink>
        <Accordion type="multiple" className="flex flex-col gap-1">
          <AccordionItem value="collections" className="border-none">
            <AccordionTrigger className="flex items-center gap-1.5 rounded-md p-2 text-base font-normal text-zinc-300 hover:bg-zinc-900 hover:no-underline">
              <Layers size={20} className="!rotate-0" />
              <p className="mr-auto">Collections</p>
            </AccordionTrigger>
            <AccordionContent asChild>
              <ul className="flex flex-col gap-1 pt-1">
                <SidebarLink href="/collections" pathname={pathname} className="pl-7">
                  All
                </SidebarLink>
                <SidebarLink href="/collections/new" pathname={pathname} className="pl-7">
                  New
                </SidebarLink>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="images" className="border-none">
            <AccordionTrigger className="flex items-center gap-1.5 rounded-md p-2 text-base font-normal text-zinc-300 hover:bg-zinc-900 hover:no-underline">
              <Camera size={20} className="!rotate-0" />
              <p className="mr-auto">Images</p>
            </AccordionTrigger>
            <AccordionContent asChild>
              <ul className="flex flex-col gap-1 pt-1">
                <SidebarLink href="/images" pathname={pathname} className="pl-7">
                  All
                </SidebarLink>
                <SidebarLink href="/images/new" pathname={pathname} className="pl-7">
                  New
                </SidebarLink>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SidebarLink Icon={Wrench} href="/settings" pathname={pathname}>
          Settings
        </SidebarLink>
      </ul>
    </div>
  );
};

export default Sidebar;
