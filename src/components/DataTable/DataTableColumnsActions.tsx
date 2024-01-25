import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

type DataTableColumnsActionsProps = {
  ticket: TicketData;
};

export default function DataTableColumnsActions({
  ticket,
}: DataTableColumnsActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link
            className="w-full text-center"
            href={`/tickets/${ticket.ticket_id}`}
          >
            View ticket
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
