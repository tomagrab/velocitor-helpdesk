import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { clerkClient } from '@clerk/nextjs/server';

type TicketDetailsProps = {
  ticket: TicketData;
};

export default async function TicketDetailsCard({
  ticket,
}: TicketDetailsProps) {
  const assigned_to = await clerkClient.users.getUser(ticket.assigned_to!);
  const owned_by = await clerkClient.users.getUser(ticket.owned_by!);

  return (
    <Card className="max-w-2xl ">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-4">
          <p>{ticket?.branches.companies.company_name}</p>
          <p>
            <small>{ticket?.branches.branch_name}</small>
          </p>

          <Badge>Ticket # {ticket?.ticket_id}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <h4>Notes</h4>
          <p>{ticket.notes}</p>
        </div>
        <div className="flex justify-between pt-4">
          <Badge>{assigned_to.emailAddresses[0].emailAddress}</Badge>
          <Badge className={`priority ${ticket.priority}`}>
            {ticket?.priority}
          </Badge>
          <Badge className={`status ${ticket.status}`}>{ticket?.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
