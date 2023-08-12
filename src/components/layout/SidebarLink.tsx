import clsx from 'clsx';
import { type LucideIcon, type LucideProps } from 'lucide-react';
import Link from 'next/link';
import { type ReactNode } from 'react';

import { cn } from '~/lib/utils';

interface Props {
  Icon: LucideIcon;
  iconProps?: LucideProps;
  href: string;
  pathname: string;
  className?: string;
  linkClassName?: string;
  children: ReactNode;
}

const SidebarLink = ({
  Icon,
  iconProps,
  href,
  pathname,
  className,
  linkClassName,
  children,
}: Props) => {
  const pathStyled = clsx([
    'flex items-center gap-1.5 rounded-l-md p-2',
    href === pathname && 'bg-zinc-900 text-red-500',
    href !== pathname && 'text-zinc-300 hover:bg-zinc-900',
  ]);
  return (
    <li className={cn(pathStyled, linkClassName)}>
      <Icon size={20} className={cn('', iconProps?.className)} {...iconProps} />
      <Link href={href} className={cn('w-full', className)}>
        {children}
      </Link>
    </li>
  );
};

export default SidebarLink;
