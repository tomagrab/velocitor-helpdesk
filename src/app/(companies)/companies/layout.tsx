import { Metadata } from 'next';

type TicketsLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Velocitor Helpdesk | Companies',
  description: 'The main Companies page of Velocitor Helpdesk.',
};

export default function TicketsLayout({ children }: TicketsLayoutProps) {
  return <>{children};</>;
}
