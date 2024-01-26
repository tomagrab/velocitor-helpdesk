import { Suspense } from 'react';
import TicketDetailsCard from './TicketDetailsCard';
import Loading from './loading';
import { auth } from '@clerk/nextjs';
import { supabaseClient } from '@/lib/Database/Supabase';
import { TicketData } from '@/lib/Types/TicketData/TicketData';

type TicketDetailsProps = {
  params: {
    id: string;
  };
};

const getTicket = async (id: number) => {
  const { getToken } = await auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from('tickets')
    .select(
      `
        ticket_id,
        status,
        priority,
        user_id,
        assigned_to,
        owned_by,
        created_at,
        branches:branches!inner(branch_name, companies:companies!inner(company_name))
      `,
    )
    .eq('ticket_id', id);

  if (error) {
    throw error;
  }

  return (data[0] as unknown as TicketData) || [];
};

export default async function TicketDetails({
  params: { id },
}: TicketDetailsProps) {
  const ticket: TicketData = (await getTicket(Number(id))) as TicketData;

  return (
    <main>
      <h1>Ticket Details</h1>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col items-center">
          <TicketDetailsCard ticket={ticket} />
        </div>
      </Suspense>
    </main>
  );
}
