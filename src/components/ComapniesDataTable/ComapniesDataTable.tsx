'use client';

import { Company } from '@/lib/Types/Company/Company';
import { DataTable } from './DataTable';
import { columns } from './DataTableColumns';

type CompaniesDataTableProps = {
  companies: Company[];
};

export default function CompaniesDataTable({
  companies,
}: CompaniesDataTableProps) {
  return <DataTable columns={columns} data={companies} />;
}
