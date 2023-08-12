import { type LucideIcon, type LucideProps } from 'lucide-react';
import Link from 'next/link';
import { type ReactNode } from 'react';

import { cn } from '~/lib/utils';

interface Props {
  Icon: LucideIcon;
  iconProps?: LucideProps;
  href: string;
  className?: string;
  linkClassName?: string;
  children: ReactNode;
}

const SidebarLink = ({ Icon, iconProps, href, className, linkClassName, children }: Props) => {
  return (
    <li className={cn('flex items-center gap-1.5 text-zinc-300 hover:bg-zinc-700', linkClassName)}>
      <Icon size={20} className={cn('', iconProps?.className)} {...iconProps} />
      <Link href={href} className={cn('', className)}>
        {children}
      </Link>
    </li>
  );
};

export default SidebarLink;
