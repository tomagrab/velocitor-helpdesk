import { auth } from '@clerk/nextjs';
import { supabaseClient } from '@/lib/Database/Supabase';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { User, clerkClient, currentUser } from '@clerk/nextjs/server';
import { TicketOwnership } from '@/lib/Types/TicketOwnership/TicketOwnership';
import TicketDisplay from './TicketDisplay';
import { Company } from '@/lib/Types/Company/Company';

type TicketDetailsProps = {
  params: {
    id: string;
  };

  searchParams?: {
    editMode: string;
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
        notes,
        assigned_to,
        owned_by,
        created_at,
        branch_id,
        branches:branches!inner(branch_name, companies:companies!inner(company_name, company_id))
      `,
    )
    .eq('ticket_id', id);

  if (error) {
    throw error;
  }

  return (data[0] as unknown as TicketData) || [];
};

const getCompanies = async () => {
  const { getToken } = await auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase.from('companies').select('*');

  if (error) {
    throw error;
  }

  return (data as unknown as Company) || [];
};

export default async function TicketDetails({
  params: { id },
  searchParams,
}: TicketDetailsProps) {
  let editMode = false;
  const ticket: TicketData = (await getTicket(Number(id))) as TicketData;
  const data: User[] = await clerkClient.users.getUserList();
  const users: User[] = JSON.parse(JSON.stringify(data));
  const companies: Company[] = (await getCompanies()) as unknown as Company[];
  const assigned_toData = await clerkClient.users.getUser(
    ticket.assigned_to as string,
  );
  const owned_byData = await clerkClient.users.getUser(
    ticket.owned_by as string,
  );
  const assigned_to: TicketOwnership = {
    id: assigned_toData.id,
    email: assigned_toData.emailAddresses[0].emailAddress,
  };
  const owned_by: TicketOwnership = {
    id: owned_byData.id,
    email: owned_byData.emailAddresses[0].emailAddress,
  };
  const user = await currentUser();

  if (
    (searchParams?.editMode && user?.id === owned_by.id) ||
    (searchParams?.editMode && user?.id === assigned_to.id)
  ) {
    editMode = searchParams?.editMode === 'true' ? true : false;
  }

  return (
    <main>
      <div className="flex flex-row items-center gap-2">
        <h1>Ticket Details</h1>
        <h2>Ticket # {ticket.ticket_id}</h2>
      </div>
      <div className="flex flex-col items-center">
        <TicketDisplay
          ticket={ticket}
          assigned_to={assigned_to}
          owned_by={owned_by}
          companies={companies}
          users={users}
          editModeQueryParam={editMode}
        />
      </div>
    </main>
  );
}
