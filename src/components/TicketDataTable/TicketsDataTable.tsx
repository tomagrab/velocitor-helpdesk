'use client';
import { DataTable } from './DataTable';
import { columns } from './DataTableColumns';
import { TicketData } from '@/lib/Types/TicketData/TicketData';

type TicketDataTableProps = {
  tickets: TicketData[];
};

export default function TicketsDataTable({ tickets }: TicketDataTableProps) {
  return <DataTable columns={columns} data={tickets} />;
}
