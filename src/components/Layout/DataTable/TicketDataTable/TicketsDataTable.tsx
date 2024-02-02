'use client';
import { User } from '@clerk/nextjs/server';
import { DataTable } from './DataTable';
import { getColumns } from './DataTableColumns';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { exportTicketsToXLSX } from '@/lib/Utilities/ExportTicketsToXLSX/ExportTicketsToXLSX';
import ExportToXLSXButton from '@/components/ui/exportToXSLXButton';

type TicketDataTableProps = {
  tickets: TicketData[];
  users: User[];
};

export default function TicketsDataTable({
  tickets,
  users,
}: TicketDataTableProps) {
  // This function will be called when the export button is clicked
  const handleExportClick = async () => {
    // Call your export function here
    await exportTicketsToXLSX(tickets, users);
  };

  return (
    <>
      <ExportToXLSXButton onClick={handleExportClick} />
      <DataTable columns={getColumns(users)} data={tickets} />
    </>
  );
}
