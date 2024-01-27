import TicketsDataTable from '@/components/DataTable/TicketDataTable/TicketsDataTable';
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
        ) : assignedTickets.length === 1 ? (
          <h3>
            You have <b>{assignedTickets.length}</b> assigned ticket
          </h3>
        ) : ownedTickets.length === 1 ? (
          <h3>
            You have <b>{ownedTickets.length}</b> owned ticket
          </h3>
        ) : (
          <h3>You have no tickets</h3>
        )}
      </div>

      {/* Tickets Accordion */}
      {/* Show accordion if either Assigned Tickets or Owned Tickets exist and their length is greater than 0 */}
      {(assignedTickets && assignedTickets.length > 0) ||
      (ownedTickets && ownedTickets.length > 0) ? (
        <Accordion type="single" collapsible className="w-full p-4 shadow-lg">
          {/* Tickets Owned */}
          {/* Only show owned tickets  */}
          {ownedTickets && ownedTickets.length > 0 ? (
            <AccordionItem value="item-1">
              <AccordionTrigger>Tickets Owned</AccordionTrigger>
              <AccordionContent>
                <TicketsDataTable tickets={ownedTickets} users={users} />
              </AccordionContent>
            </AccordionItem>
          ) : null}

          {/* Tickets Assigned */}
          {assignedTickets && assignedTickets.length > 0 ? (
            <AccordionItem value="item-2">
              <AccordionTrigger>Tickets Assigned</AccordionTrigger>
              <AccordionContent>
                <TicketsDataTable tickets={assignedTickets} users={users} />
              </AccordionContent>
            </AccordionItem>
          ) : null}
        </Accordion>
      ) : null}
    </main>
  );
}
