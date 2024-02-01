import Image from 'next/image';
import SidebarItem from './SidebarItem/SidebarItem';
import { Building, Home, Store, Ticket, User } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar flex-shrink-0 transform overflow-hidden bg-velgray transition-all duration-300 ease-out">
      <div className="flex h-16 items-center justify-center bg-velblue">
        <Image
          width={32}
          height={32}
          src="https://vtrack.velsol.com/Content/images/VTrack-Logo-Small.png"
          alt="V"
        />
      </div>
      <SidebarItem href={`/`} icon={<Home />} title="Dashboard" />
      <SidebarItem href={`/tickets`} icon={<Ticket />} title="Tickets" />
      <SidebarItem href={`/companies`} icon={<Building />} title="Companies" />
      <SidebarItem href={`/branches`} icon={<Store />} title="Branches" />
      <SidebarItem href={`/users`} icon={<User />} title="Users" />
    </aside>
  );
}
