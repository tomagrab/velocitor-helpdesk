import { Metadata } from 'next';

type TicketsLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Velocitor Helpdesk | Tickets',
  description: 'The main Tickets page of Velocitor Helpdesk.',
};

export default function TicketsLayout({ children }: TicketsLayoutProps) {
  return <>{children};</>;
}
