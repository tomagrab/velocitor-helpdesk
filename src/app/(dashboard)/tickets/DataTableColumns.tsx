'use client';

import { Database } from '@/lib/Types/Database/Database';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<
  Database['public']['Tables']['tickets']['Row']
>[] = [
  {
    accessorKey: 'ticket_id',
    header: 'ID',
  },
  {
    accessorKey: 'branch_id',
    header: 'Branch',
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
    accessorKey: 'user_id',
    header: 'User',
  },
];
