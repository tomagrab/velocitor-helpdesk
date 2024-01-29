import UserCard from '@/components/Layout/Users/UserCard/UserCard';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAssignedTickets } from '@/lib/Utilities/GetAssignedTickets/GetAssignedTickets';
import { getOwnedTickets } from '@/lib/Utilities/GetOwnedTickets/GetOwnedTickets';
import TicketAccordion from '@/components/Layout/Ticket/TicketAccordian/TicketAccordian';

type UserDetailsProps = {
  params: {
    id: string;
  };
};

export default async function UserDetails({ params }: UserDetailsProps) {
  const user = await clerkClient.users.getUser(params.id);
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));

  if (!user) {
    redirect('/users');
  }

  const assignedTickets: TicketData[] = (await getAssignedTickets(
    user.id,
  )) as TicketData[];
  const ownedTickets: TicketData[] = (await getOwnedTickets(
    user.id,
  )) as TicketData[];

  return (
    <main>
      <UserCard user={user} showProfileLink={false} />
      <TicketAccordion
        assignedTickets={assignedTickets}
        ownedTickets={ownedTickets}
        users={users}
      />
    </main>
  );
}
