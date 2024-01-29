import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Roboto } from 'next/font/google';
import NavbarLinks from '../NavbarLinks/NavbarLinks';
const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

export default function NavbarDropdown() {
  return (
    <Popover>
      <PopoverTrigger asChild className="flex cursor-pointer items-center">
        <h1 className="rounded p-2 shadow-md">
          <span className={`velocitor blue ${roboto.className}`}>
            Velocitor
          </span>
          {` `}
          <span className={`velocitor yellow green ${roboto.className}`}>
            Helpdesk
          </span>
        </h1>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-2">
        <NavbarLinks className="flex flex-col items-center" />
      </PopoverContent>
    </Popover>
  );
}
