import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
    <Card className="w-full max-w-md">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-4">
          <Badge>Ticket # {ticket?.ticket_id}</Badge>
          <p>{ticket?.branches.companies.company_name}</p>
          <p>
            <small>{ticket?.branches.branch_name}</small>
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Label className="text-lg font-bold">Notes</Label>
        <p>
          {ticket.notes && ticket.notes != '' && ticket.notes?.length > 1
            ? ticket.notes
            : `No notes!`}
        </p>

        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Assigned to</Label>
            <Badge className="self-center">
              {assigned_to.emailAddresses[0].emailAddress}
            </Badge>
          </div>

          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Owned By</Label>
            <Badge className="self-center">
              {owned_by.emailAddresses[0].emailAddress}
            </Badge>
          </div>

          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Priority</Label>
            <Badge className={`priority self-center ${ticket.priority}`}>
              {ticket?.priority}
            </Badge>
          </div>

          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Status</Label>
            <Badge className={`status self-center ${ticket.status}`}>
              {ticket?.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
