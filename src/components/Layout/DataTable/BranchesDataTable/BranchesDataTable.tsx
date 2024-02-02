'use client';

import { exportBranchesToXLSX } from '@/lib/Utilities/ExportBranchesToXLSX/ExportBranchesToXLSX';
import { DataTable } from './DataTable';
import { columns } from './DataTableColumns';
import { Branch } from '@/lib/Types/Branch/Branch';
import ExportToXLSXButton from '@/components/ui/exportToXSLXButton';

type BranchesDataTableProps = {
  branches: Branch[];
};

export default function BranchesDataTable({
  branches,
}: BranchesDataTableProps) {
  const handleExportClick = async () => {
    await exportBranchesToXLSX(branches);
  };

  return (
    <>
      <ExportToXLSXButton onClick={handleExportClick} />
      <DataTable columns={columns} data={branches} />;
    </>
  );
}
