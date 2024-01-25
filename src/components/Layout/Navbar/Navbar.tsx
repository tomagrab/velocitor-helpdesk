import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NavbarLinks from './NavbarLinks/NavbarLinks';
import NavbarUser from './NavbarUser/NavbarUser';
import { Roboto } from 'next/font/google';
const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

export default function Navbar() {
  return (
    <nav>
      <header>
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

        <NavbarLinks />
      </header>
      <NavbarUser />
    </nav>
  );
}
