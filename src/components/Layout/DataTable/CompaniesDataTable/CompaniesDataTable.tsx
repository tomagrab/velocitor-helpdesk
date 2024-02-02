'use client';

import { Company } from '@/lib/Types/Company/Company';
import { DataTable } from './DataTable';
import { columns } from './DataTableColumns';
import { exportCompaniesToXLSX } from '@/lib/Utilities/ExportCompaniesToXLSX/ExportCompaniesToXLSX';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';
import ExportToXLSXButton from '@/components/ui/exportToXSLXButton';

type CompaniesDataTableProps = {
  companies: Company[];
};

export default function CompaniesDataTable({
  companies,
}: CompaniesDataTableProps) {
  const handleExportClick = async () => {
    await exportCompaniesToXLSX(companies);
  };

  return (
    <>
      <ExportToXLSXButton onClick={handleExportClick} />
      <DataTable columns={columns} data={companies} />;
    </>
  );
}
