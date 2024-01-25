import Link from 'next/link';
import TicketDataTable from './TicketDataTable';
import { Badge } from '@/components/ui/badge';
import { auth } from '@clerk/nextjs';
import { supabaseClient } from '@/lib/Database/Supabase';
import { TicketData } from '@/lib/Types/TicketData/TicketData';

const getTickets = async () => {
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase.from('tickets').select(
    `
            ticket_id,
            status,
            priority,
            user_fullName,
            user_email,
            branches:branches!inner(branch_name, companies:companies!inner(company_name))
      `,
  );

  if (error) {
    throw error;
  }

  return (data as unknown as TicketData[]) || [];
};

export default async function Tickets() {
  const tickets: TicketData[] = (await getTickets()) as TicketData[];
  return (
    <main>
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex flex-row items-baseline gap-2">
          <h2>Tickets</h2>
          <h3>Current tickets</h3>
        </div>

        <Link href="/tickets/create">
          <Badge className="bg-green-500 hover:bg-green-400">Create</Badge>
        </Link>
      </div>

      <TicketDataTable tickets={tickets} />
    </main>
  );
}
