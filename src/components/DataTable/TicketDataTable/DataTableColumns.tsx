'use client';

import { Badge } from '@/components/ui/badge';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnsActions from './DataTableColumnsActions';
import ColumnHeader from './DataTableColumnsHeader';
import DataTableColumnsCell from './DataTableColumnsCell';
import { User } from '@clerk/nextjs/server';
import Link from 'next/link';
import { ChevronsDown, ChevronsRight, ChevronsUp } from 'lucide-react';

export const getColumns = (users: User[]): ColumnDef<TicketData>[] => [
  {
    accessorKey: 'ticket_id',
    accessorFn: ticket => {
      return ticket.ticket_id.toString();
    },
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Ticket #"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DataTableColumnsCell>
          <Link href={`/tickets/${ticket.ticket_id}`}>{ticket.ticket_id}</Link>
        </DataTableColumnsCell>
      );
    },
  },
  {
    accessorKey: 'branches.branch_name',
    accessorFn: row => row.branches.branch_name,
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Branch"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DataTableColumnsCell>
          <Link href={`/branches/${ticket.branches.branch_id}`}>
            <Badge>{ticket.branches.branch_name}</Badge>
          </Link>
        </DataTableColumnsCell>
      );
    },
  },
  {
    accessorKey: 'branches.companies.company_name',
    accessorFn: row => row.branches.companies.company_name,
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Company"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DataTableColumnsCell>
          <Link href={`/companies/${ticket.branches.company_id}`}>
            <Badge>{ticket.branches.companies.company_name}</Badge>
          </Link>
        </DataTableColumnsCell>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Status"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DataTableColumnsCell>
          <Badge className={`status ${ticket.status}`}>{ticket.status}</Badge>
        </DataTableColumnsCell>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Priority"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DataTableColumnsCell>
          <Badge className={`priority ${ticket.priority}`}>
            {ticket.priority === 'low' ? (
              <>
                <ChevronsDown size={16} /> {ticket.priority}{' '}
              </>
            ) : ticket.priority === 'medium' ? (
              <>
                <ChevronsRight size={16} /> {ticket.priority}
              </>
            ) : (
              <>
                <ChevronsUp size={16} /> {ticket.priority}
              </>
            )}
          </Badge>
        </DataTableColumnsCell>
      );
    },
  },
  {
    accessorKey: 'assigned_to',
    accessorFn: row =>
      users.find(user => user.id === row.assigned_to)?.emailAddresses[0]
        .emailAddress,

    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Assigned To"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DataTableColumnsCell>
          {
            users.find(user => user.id === ticket.assigned_to)
              ?.emailAddresses[0].emailAddress
          }
        </DataTableColumnsCell>
      );
    },
  },
  {
    accessorKey: 'owned_by',
    accessorFn: row =>
      users.find(user => user.id === row.owned_by)?.emailAddresses[0]
        .emailAddress,

    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Owned By"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DataTableColumnsCell>
          {
            users.find(user => user.id === ticket.owned_by)?.emailAddresses[0]
              .emailAddress
          }
        </DataTableColumnsCell>
      );
    },
  },
  {
    accessorKey: 'created_at',
    accessorFn: row => new Date(row.created_at as string).toLocaleString(),
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Created At"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DataTableColumnsCell>
          {new Date(ticket.created_at as string).toLocaleString()}
        </DataTableColumnsCell>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;

      return <DataTableColumnsActions ticket={ticket} />;
    },
  },
];
