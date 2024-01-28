'use client';

import { ColumnDef } from '@tanstack/react-table';
import ColumnHeader from './DataTableColumnsHeader';
import DataTableColumnsCell from './DataTableColumnsCell';
import DataTableColumnsActions from './DataTableColumnsActions';
import { Branch } from '@/lib/Types/Branch/Branch';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const columns: ColumnDef<Branch>[] = [
  {
    accessorKey: 'branch_id',
    accessorFn: branch => {
      return branch.branch_id.toString();
    },
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Branch #"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const branch = row.original;

      return <DataTableColumnsCell>{branch.branch_id}</DataTableColumnsCell>;
    },
  },
  {
    accessorKey: 'branch_name',
    accessorFn: row => row.branch_name,
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Branch Name"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const branch = row.original;

      return (
        <DataTableColumnsCell>
          <Badge>
            <Link href={`/branches/${branch.branch_id}`}>
              {branch.branch_name}
            </Link>
          </Badge>
        </DataTableColumnsCell>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const branch = row.original;

      return <DataTableColumnsActions branch={branch} />;
    },
  },
];
