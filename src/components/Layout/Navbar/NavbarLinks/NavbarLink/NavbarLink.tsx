import { Button } from '@/components/ui/button';
import Link from 'next/link';

type NavbarLinkProps = {
  href: string;
  pathname: string;
  title: string;
};

export default function NavbarLink({ href, pathname, title }: NavbarLinkProps) {
  return (
    <Link href={href}>
      <Button variant={pathname === href ? `default` : `ghost`}>{title}</Button>
    </Link>
  );
}
