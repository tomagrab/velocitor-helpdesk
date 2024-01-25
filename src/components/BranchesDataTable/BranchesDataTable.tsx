'use client';

import { DataTable } from './DataTable';
import { columns } from './DataTableColumns';
import { Branch } from '@/lib/Types/Branch/Branch';

type BranchesDataTableProps = {
  branches: Branch[];
};

export default function BranchesDataTable({
  branches,
}: BranchesDataTableProps) {
  return <DataTable columns={columns} data={branches} />;
}
