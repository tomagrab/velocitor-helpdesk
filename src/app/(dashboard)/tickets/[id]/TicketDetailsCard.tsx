'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { TicketOwnership } from '@/lib/Types/TicketOwnership/TicketOwnership';
import { useUser } from '@clerk/nextjs';

type TicketDetailsProps = {
  ticket: TicketData;
  assigned_to: TicketOwnership;
  owned_by: TicketOwnership;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

export default function TicketDetailsCard({
  ticket,
  assigned_to,
  owned_by,
  editMode,
  setEditMode,
}: TicketDetailsProps) {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-4">
          <Badge>Ticket # {ticket?.ticket_id}</Badge>
          <p>{ticket?.branches.companies.company_name}</p>
          <p>
            <small>{ticket?.branches.branch_name}</small>
          </p>

          {ticket.assigned_to === user?.id || ticket.owned_by === user?.id ? (
            <Badge
              className="bg-blue-500 hover:cursor-pointer hover:bg-blue-400"
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              Edit
            </Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Assigned to</Label>
            <Badge className="self-center text-base md:text-lg">
              {assigned_to.email}
            </Badge>
          </div>

          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Owned By</Label>
            <Badge className="self-center text-base md:text-lg">
              {owned_by.email}
            </Badge>
          </div>

          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Priority</Label>
            <Badge
              className={`priority self-center text-base md:text-lg ${ticket.priority}`}
            >
              {ticket?.priority}
            </Badge>
          </div>

          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Status</Label>
            <Badge
              className={`status self-center text-base md:text-lg ${ticket.status}`}
            >
              {ticket?.status}
            </Badge>
          </div>

          <div className="flex w-full flex-col gap-2 rounded py-4 ">
            <Label className="text-lg font-bold">Notes</Label>
            <p className="md:text-lg">
              {ticket.notes && ticket.notes?.length > 1
                ? ticket.notes
                : `No notes!`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
