'use client';
import { User } from '@clerk/nextjs/server';
import { DataTable } from './DataTable';
import { getColumns } from './DataTableColumns';
import { TicketData } from '@/lib/Types/TicketData/TicketData';

type TicketDataTableProps = {
  tickets: TicketData[];
  users: User[];
};

export default function TicketsDataTable({
  tickets,
  users,
}: TicketDataTableProps) {
  return <DataTable columns={getColumns(users)} data={tickets} />;
}
