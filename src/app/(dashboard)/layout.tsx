import Navbar from '@/components/Layout/Navbar/Navbar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
