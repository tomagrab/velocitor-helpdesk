'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type SidebarItemProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
};

export default function SidebarItem({ href, icon, title }: SidebarItemProps) {
  const pathname = usePathname();
  return (
    <div className="group">
      <Link
        href={href}
        className={`${pathname === href || (pathname.includes(href) && href.length != 1) ? `text-velblue` : `text-white`} relative block h-full min-h-[4rem]`}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0`}
        >
          {icon}
        </span>
        <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {title}
        </span>
      </Link>
    </div>
  );
}
