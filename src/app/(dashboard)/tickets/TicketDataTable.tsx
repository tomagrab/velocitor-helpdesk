'use client';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { columns } from './DataTableColumns';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { supabaseClient } from '@/lib/Database/Supabase';

export default function TicketDataTable() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();

  const { getToken } = useAuth();

  const fetchData = async () => {
    if (!isLoaded || !isSignedIn || !user) return;

    try {
      const supabaseAccessToken = await getToken({ template: 'supabase' });
      if (!supabaseAccessToken) {
        console.error('Failed to get access token');
        return;
      }

      const supabase = await supabaseClient(supabaseAccessToken);

      const { data, error } = await supabase.from('tickets').select(`
        ticket_id,
        status,
        priority,
        user_fullName,
        branches:branches!inner(branch_name, companies:companies!inner(company_name))
      `);

      console.log('data', data);

      if (error) throw error;
      if (data) setTickets(data as unknown as TicketData[]);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]); // Dependency on user object

  return <DataTable columns={columns} data={tickets} />;
}
