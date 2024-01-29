import TicketsDataTable from '@/components/Layout/DataTable/TicketDataTable/TicketsDataTable';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { auth, clerkClient } from '@clerk/nextjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getAssignedTickets } from '@/lib/Utilities/GetAssignedTickets/GetAssignedTickets';
import { getOwnedTickets } from '@/lib/Utilities/GetOwnedTickets/GetOwnedTickets';
import { Metadata } from 'next';
import TicketAccordion from '@/components/Layout/Ticket/TicketAccordian/TicketAccordian';

export const metadata: Metadata = {
  title: 'Velocitor Helpdesk | Dashboard',
  description: 'The main Dashboard page of Velocitor Helpdesk.',
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
      </div>

      <TicketAccordion
        assignedTickets={assignedTickets}
        ownedTickets={ownedTickets}
        users={users}
      />
    </main>
  );
}
