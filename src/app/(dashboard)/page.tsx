import TicketsDataTable from '@/components/DataTable/TicketDataTable/TicketsDataTable';
import { supabaseClient } from '@/lib/Database/Supabase';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { auth, clerkClient } from '@clerk/nextjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const getAssignedTickets = async (userId: string) => {
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
            user_id,
            assigned_to,
            owned_by,
            created_at,
            branches:branches!inner(branch_name, branch_id, company_id, companies:companies!inner(company_name))
      `,
    )
    .eq('assigned_to', userId);

  if (error) {
    throw error;
  }

  return (data as unknown as TicketData[]) || [];
};

const getOwnedTickets = async (userId: string) => {
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
            user_id,
            assigned_to,
            owned_by,
            created_at,
            branches:branches!inner(branch_name, branch_id, company_id, companies:companies!inner(company_name))
      `,
    )
    .eq('owned_by', userId);

  if (error) {
    throw error;
  }

  return (data as unknown as TicketData[]) || [];
};

export default async function Dashboard() {
  const { userId } = auth();
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));

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

  const assignedTickets: TicketData[] = (await getAssignedTickets(
    userId,
  )) as TicketData[];
  const ownedTickets: TicketData[] = (await getOwnedTickets(
    userId,
  )) as TicketData[];
  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Dashboard</h2>
        {assignedTickets.length > 1 && ownedTickets.length > 1 ? (
          <h3>
            You have <b>{ownedTickets.length}</b> owned tickets and{' '}
            <b>{assignedTickets.length}</b> assigned tickets
          </h3>
        ) : assignedTickets.length > 1 ? (
          <h3>
            You have <b>{assignedTickets.length}</b> assigned tickets
          </h3>
        ) : ownedTickets.length > 1 ? (
          <h3>
            You have <b>{ownedTickets.length}</b> owned tickets
          </h3>
        ) : (
          <h3>You have no tickets</h3>
        )}
      </div>

      <Accordion type="single" collapsible className="w-full p-4 shadow-lg">
        {/* Tickets Owned */}
        <AccordionItem value="item-1">
          <AccordionTrigger>Tickets Owned</AccordionTrigger>
          <AccordionContent>
            <TicketsDataTable tickets={ownedTickets} users={users} />
          </AccordionContent>
        </AccordionItem>

        {/* Tickets Assigned */}
        <AccordionItem value="item-2">
          <AccordionTrigger>Tickets Assigned</AccordionTrigger>
          <AccordionContent>
            <TicketsDataTable tickets={assignedTickets} users={users} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
