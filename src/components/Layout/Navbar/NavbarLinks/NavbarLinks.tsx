'use client';

import { usePathname } from 'next/navigation';
import NavbarLink from './NavbarLink/NavbarLink';

type NavbarLinksProps = {
  className?: string;
};

export default function NavbarLinks({ className }: NavbarLinksProps) {
  const pathname = usePathname();
  return (
    <div className={className}>
      <NavbarLink href="/" pathname={pathname} title="Dashboard" />
      <NavbarLink href="/tickets" pathname={pathname} title="Tickets" />
      <NavbarLink href="/companies" pathname={pathname} title="Companies" />
      <NavbarLink href="/branches" pathname={pathname} title="Branches" />
      <NavbarLink href="/users" pathname={pathname} title="Users" />
    </div>
  );
}
