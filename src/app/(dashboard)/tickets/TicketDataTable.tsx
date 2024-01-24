'use client';
import { Database } from '@/lib/Types/Database/Database';
import { useAuth, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { columns } from './DataTableColumns';
import { UseUserT } from '@/lib/Types/User/User';

const supabaseClient = async (supabaseAccessToken: string) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    },
  );
  return supabase;
};

export default function TicketDataTable() {
  const [tickets, setTickets] = useState<
    Database['public']['Tables']['tickets']['Row'][]
  >([]);
  const { isLoaded, isSignedIn, user } = useUser() as UseUserT;
  console.log('user', user);

  const { getToken } = useAuth();

  const fetchData = async () => {
    try {
      const supabaseAccessToken = await getToken({ template: 'supabase' });

      const supabase = await supabaseClient(supabaseAccessToken!);

      if (isLoaded && isSignedIn && user) {
        const { data, error } = await supabase
          .from('tickets')
          .select()
          .eq('user_id', user.id);

        if (error) throw error;

        setTickets(data);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return <DataTable columns={columns} data={tickets} />;
}
