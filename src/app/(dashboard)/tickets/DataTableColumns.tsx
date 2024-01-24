'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<TicketData>[] = [
  {
    accessorKey: 'ticket_id',
    header: 'Ticket #',
  },
  {
    accessorFn: row => row.branches.branch_name, // Access branch name
    header: 'Branch',
  },
  {
    accessorFn: row => row.branches.companies.company_name, // Access company name
    header: 'Company',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <Badge className={`status ${ticket.status}`}>{ticket.status}</Badge>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <Badge className={`priority ${ticket.priority}`}>
          {ticket.priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'user_fullName',
    header: 'User',
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;

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
              <Link href={`/tickets/${ticket.ticket_id}`}>View ticket</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
