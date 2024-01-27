import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NavbarLinks from './NavbarLinks/NavbarLinks';
import NavbarUser from './NavbarUser/NavbarUser';
import { Roboto } from 'next/font/google';
import NavbarDropdown from './NavbarDropdown/NavbarDropdown';
const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

export default function Navbar() {
  return (
    <nav>
      <header>
        <div className="flex md:hidden ">
          <NavbarDropdown />
        </div>

        <div className="hidden md:flex md:items-center md:gap-2">
          <Avatar>
            <AvatarImage
              src="https://vtrackuat.velsol.com/Content/images/VTrack-Logo-Small.png"
              alt="Velocitor Logo"
            />
            <AvatarFallback>VH</AvatarFallback>
          </Avatar>
          <h1>
            <span className={`velocitor blue ${roboto.className}`}>
              Velocitor
            </span>
            {` `}
            <span className={`velocitor yellow green ${roboto.className}`}>
              Helpdesk
            </span>
          </h1>

          <NavbarLinks className="flex flex-row items-center gap-2" />
        </div>
      </header>
      <NavbarUser />
    </nav>
  );
}
