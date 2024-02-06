import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { User, clerkClient, currentUser } from '@clerk/nextjs/server';
import { TicketOwnership } from '@/lib/Types/TicketOwnership/TicketOwnership';
import TicketDisplay from '@/components/Layout/Ticket/TicketDisplay/TicketDisplay';
import { Company } from '@/lib/Types/Company/Company';
import { getTicket } from '@/lib/Utilities/GetTicket/GetTicket';
import { getCompanies } from '@/lib/Utilities/GetCompanies/GetCompanies';

type TicketDetailsProps = {
  params: {
    id: string;
  };

  searchParams?: {
    editMode: string;
  };
};

export default async function TicketDetails({
  params: { id },
  searchParams,
}: TicketDetailsProps) {
  let editMode = false;
  const ticket: TicketData = (await getTicket(
    Number(id),
  )) as unknown as TicketData;
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
