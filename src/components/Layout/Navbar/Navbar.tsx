import NavbarUser from './NavbarUser/NavbarUser';
import NavbarSidebarToggle from './NavbarSidebarToggle/NavbarSidebarToggle';

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-lg">
      <div className="flex w-1/2 justify-start">
        <NavbarSidebarToggle />
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
