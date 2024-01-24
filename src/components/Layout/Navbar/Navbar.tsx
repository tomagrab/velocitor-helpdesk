import NavbarLinks from './NavbarLinks/NavbarLinks';
import NavbarUser from './NavbarUser/NavbarUser';

export default function Navbar() {
  return (
    <nav>
      <header>
        <h1>Velocitor Helpdesk</h1>
        <NavbarLinks />
      </header>
      <NavbarUser />
    </nav>
  );
}
