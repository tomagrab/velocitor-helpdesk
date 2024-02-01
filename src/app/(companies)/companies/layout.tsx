import { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './loading';

type TicketsLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Companies | Velocitor Helpdesk',
  description: 'The main Companies page of Velocitor Helpdesk.',
};

export default function TicketsLayout({ children }: TicketsLayoutProps) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
