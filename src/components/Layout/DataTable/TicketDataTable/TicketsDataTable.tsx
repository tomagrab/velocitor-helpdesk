'use client';
import { User } from '@clerk/nextjs/server';
import { DataTable } from './DataTable';
import { getColumns } from './DataTableColumns';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { exportTicketsToXLSX } from '@/lib/Utilities/ExportTicketsToXLSX/ExportTicketsToXLSX';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';

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
    console.log('Exporting to XLSX');
    console.log('Tickets:', tickets);
    // Call your export function here
    await exportTicketsToXLSX(tickets, users);
  };

  return (
    <>
      <Button
        onClick={handleExportClick}
        className="bg-officegreen hover:bg-officelightgreen flex items-center gap-2 transition-colors duration-300 ease-in-out"
      >
        <FileSpreadsheet className="h-5 w-5" />
        Export to Excel
      </Button>
      <DataTable columns={getColumns(users)} data={tickets} />
    </>
  );
}
