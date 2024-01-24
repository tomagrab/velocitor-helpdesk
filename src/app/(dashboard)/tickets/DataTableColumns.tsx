'use client';

import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TicketData>[] = [
  {
    accessorKey: 'ticket_id',
    header: 'ID',
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
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'user_fullName',
    header: 'User',
  },
];
