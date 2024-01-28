import { Metadata } from 'next';

type TicketsLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Velocitor Helpdesk | Branches',
  description: 'The main Branches page of Velocitor Helpdesk.',
};

export default function TicketsLayout({ children }: TicketsLayoutProps) {
  return <>{children};</>;
}
