import NavbarUser from './NavbarUser/NavbarUser';
import { Roboto } from 'next/font/google';
import { ChevronsRight } from 'lucide-react';
const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-lg">
      <div className="flex w-1/2 justify-start">
        <label htmlFor="sidebar-toggle" className="cursor-pointer ">
          <ChevronsRight
            className="sidebar-toggle-btn text-velgray transition-transform duration-300 ease-out"
            size={24}
          />
        </label>
      </div>
      <div className="shrink-0">
        <header>
          <h1 className="select-none text-2xl font-bold text-velblue drop-shadow-lg">
            Velocitor Helpdesk
          </h1>
        </header>
      </div>
      <div className="flex w-1/2 justify-end">
        <NavbarUser />
      </div>
    </nav>
  );
}
