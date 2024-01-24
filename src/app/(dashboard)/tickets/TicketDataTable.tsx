'use client';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { columns } from './DataTableColumns';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { supabaseClient } from '@/lib/Database/Supabase';

type TicketDataTableProps = {
  tickets: TicketData[];
};

export default function TicketDataTable({ tickets }: TicketDataTableProps) {
  return <DataTable columns={columns} data={tickets} />;
}
