'use client';

import { ColumnDef } from '@tanstack/react-table';
import ColumnHeader from '../DataTableColumnsHeader/DataTableColumnsHeader';
import DataTableColumnsCell from '../DataTableColumnsCell/DataTableColumnsCell';
import { Company } from '@/lib/Types/Company/Company';
import DataTableColumnsActions from './DataTableColumnsActions';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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
        <DataTableColumnsCell>
          <Badge>
            <Link href={`/companies/${company.company_id}`}>
              {company.company_name}
            </Link>
          </Badge>
        </DataTableColumnsCell>
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
