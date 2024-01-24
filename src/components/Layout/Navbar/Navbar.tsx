import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NavbarLinks from './NavbarLinks/NavbarLinks';
import NavbarUser from './NavbarUser/NavbarUser';

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
        <h1>Velocitor Helpdesk</h1>
        <NavbarLinks />
      </header>
      <NavbarUser />
    </nav>
  );
}
