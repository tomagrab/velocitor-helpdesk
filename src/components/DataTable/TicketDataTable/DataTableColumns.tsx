'use client';

import { Badge } from '@/components/ui/badge';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnsActions from './DataTableColumnsActions';
import ColumnHeader from './DataTableColumnsHeader';
import DataTableColumnsCell from './DataTableColumnsCell';
import { User } from '@clerk/nextjs/server';

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

      return <DataTableColumnsCell>{ticket.ticket_id}</DataTableColumnsCell>;
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
          {ticket.branches.branch_name}
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
          {ticket.branches.companies.company_name}
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
            {ticket.priority}
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
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;

      return <DataTableColumnsActions ticket={ticket} />;
    },
  },
];
