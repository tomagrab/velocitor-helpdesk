import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NavbarLinks from './NavbarLinks/NavbarLinks';
import NavbarUser from './NavbarUser/NavbarUser';
import { Roboto } from 'next/font/google';
import NavbarDropdown from './NavbarDropdown/NavbarDropdown';
import { ChevronsRight } from 'lucide-react';
const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-lg">
      <div className="w-1/2 justify-start">
        <label htmlFor="sidebar-toggle" className="cursor-pointer ">
          <ChevronsRight
            className="text-velgray sidebar-toggle-btn transition-transform duration-300 ease-out"
            size={24}
          />
        </label>
      </div>
      <div className="shrink-0">
        <header>
          <h1 className="text-velblue text-2xl font-bold">Veloci-Points</h1>
        </header>
      </div>
      <div className="w-1/2 justify-end"></div>
    </nav>
  );
}
