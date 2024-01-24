import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketData } from '@/lib/Types/TicketData/TicketData';

type TicketDetailsProps = {
  ticket: TicketData;
};

export default function TicketDetailsCard({ ticket }: TicketDetailsProps) {
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
          <Badge>{ticket?.user_fullName}</Badge>
          <Badge className={`priority ${ticket.priority}`}>
            {ticket?.priority}
          </Badge>
          <Badge className={`status ${ticket.status}`}>{ticket?.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
