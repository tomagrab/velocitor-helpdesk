'use client';

import { usePathname } from 'next/navigation';
import NavbarLink from './NavbarLink/NavbarLink';

export default function NavbarLinks() {
  const pathname = usePathname();
  return (
    <div className={`flex flex-row items-center gap-2`}>
      <NavbarLink href="/" pathname={pathname} title="Dashboard" />
      <NavbarLink href="/tickets" pathname={pathname} title="Tickets" />
      <NavbarLink href="/companies" pathname={pathname} title="Companies" />
      <NavbarLink href="/branches" pathname={pathname} title="Branches" />
      <NavbarLink href="/users" pathname={pathname} title="Users" />
    </div>
  );
}
