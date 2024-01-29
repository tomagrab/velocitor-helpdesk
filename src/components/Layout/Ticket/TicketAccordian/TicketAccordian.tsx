import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { User } from '@clerk/nextjs/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import TicketsDataTable from '@/components/Layout/DataTable/TicketDataTable/TicketsDataTable';

type TicketAccordionProps = {
  assignedTickets: TicketData[];
  ownedTickets: TicketData[];
  users: User[];
};

export default function TicketAccordion({
  assignedTickets,
  ownedTickets,
  users,
}: TicketAccordionProps) {
  return (
    <>
      {(assignedTickets && assignedTickets.length > 0) ||
      (ownedTickets && ownedTickets.length > 0) ? (
        <Accordion type="single" collapsible className="w-full p-4 shadow-lg">
          {/* Tickets Owned */}
          {/* Only show owned tickets  */}
          {ownedTickets && ownedTickets.length > 0 ? (
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Tickets Owned - {ownedTickets.length}
              </AccordionTrigger>
              <AccordionContent>
                <TicketsDataTable tickets={ownedTickets} users={users} />
              </AccordionContent>
            </AccordionItem>
          ) : null}

          {/* Tickets Assigned */}
          {assignedTickets && assignedTickets.length > 0 ? (
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Tickets Assigned - {assignedTickets.length}
              </AccordionTrigger>
              <AccordionContent>
                <TicketsDataTable tickets={assignedTickets} users={users} />
              </AccordionContent>
            </AccordionItem>
          ) : null}
        </Accordion>
      ) : (
        <h3 className="text-3xl">No Tickets Found</h3>
      )}
    </>
  );
}
