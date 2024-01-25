'use client';

import { ColumnDef } from '@tanstack/react-table';
import ColumnHeader from './DataTableColumnsHeader';
import DataTableColumnsCell from './DataTableColumnsCell';
import { Company } from '@/lib/Types/Company/Company';
import DataTableColumnsActions from './DataTableColumnsActions';

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'company_id',
    accessorFn: company => {
      return company.company_id.toString();
    },
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Company #"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const company = row.original;

      return <DataTableColumnsCell>{company.company_id}</DataTableColumnsCell>;
    },
  },
  {
    accessorKey: 'company_name',
    accessorFn: row => row.company_name,
    header: ({ column }) => {
      return (
        <ColumnHeader
          title="Company Name"
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const company = row.original;

      return (
        <DataTableColumnsCell>{company.company_name}</DataTableColumnsCell>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const company = row.original;

      return <DataTableColumnsActions company={company} />;
    },
  },
];
