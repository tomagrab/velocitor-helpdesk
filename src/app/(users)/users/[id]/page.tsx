import UserCard from '@/components/Layout/Users/UserCard/UserCard';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import TicketsDataTable from '@/components/Layout/DataTable/TicketDataTable/TicketsDataTable';
import { getAssignedTickets } from '@/lib/Utilities/GetAssignedTickets/GetAssignedTickets';
import { getOwnedTickets } from '@/lib/Utilities/GetOwnedTickets/GetOwnedTickets';

type UserDetailsProps = {
  params: {
    id: string;
  };
};

export default async function UserDetails({ params }: UserDetailsProps) {
  const user = await clerkClient.users.getUser(params.id);
  const email = user.emailAddresses[0].emailAddress;
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
      <Accordion type="single" collapsible className="w-full p-4 shadow-lg">
        {/* Tickets Owned */}
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Tickets Owned - {ownedTickets.length}
          </AccordionTrigger>
          <AccordionContent>
            <TicketsDataTable tickets={ownedTickets} users={users} />
          </AccordionContent>
        </AccordionItem>

        {/* Tickets Assigned */}
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Tickets Assigned - {assignedTickets.length}
          </AccordionTrigger>
          <AccordionContent>
            <TicketsDataTable tickets={assignedTickets} users={users} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
