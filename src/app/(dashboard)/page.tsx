import TicketsDataTable from '@/components/TicketDataTable/TicketsDataTable';
import { supabaseClient } from '@/lib/Database/Supabase';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { auth } from '@clerk/nextjs';
import { redirect } from '@clerk/nextjs/server';

const getTickets = async (userId: string) => {
  const { getToken } = auth();
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
            user_fullName,
            user_email,
            branches:branches!inner(branch_name, companies:companies!inner(company_name))
      `,
    )
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  return (data as unknown as TicketData[]) || [];
};

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return (
      <main>
        <div className="flex flex-row items-baseline gap-2">
          <h2>Dashboard</h2>
          <h3>
            The main Dashboard of <b>Velocitor Helpdesk</b>
          </h3>
        </div>
      </main>
    );
  }

  const tickets: TicketData[] = (await getTickets(userId)) as TicketData[];

  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Dashboard</h2>
        {tickets.length > 0 && tickets.length != 1 ? (
          <h3>
            You have <b>{tickets.length}</b> tickets
          </h3>
        ) : tickets.length === 1 ? (
          <h3>
            You have <b>1</b> ticket
          </h3>
        ) : tickets.length === 0 ? (
          <h3>
            You have <b>0</b> tickets
          </h3>
        ) : null}
      </div>
      <TicketsDataTable tickets={tickets} />
    </main>
  );
}
