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
    <div className="relative w-full p-4 shadow-lg">
      {ticket.assigned_to === user?.id || ticket.owned_by === user?.id ? (
        <Badge
          className=" absolute right-4 top-4 cursor-pointer bg-blue-500 hover:bg-blue-400"
          onClick={() => setEditMode(!editMode)}
        >
          Edit
        </Badge>
      ) : null}
      <div className="flex">
        <div className="flex grow flex-col gap-4 ">
          <div className="flex flex-row items-center gap-2">
            <div>
              <h2 className="text-xl font-bold">
                {ticket?.branches.companies.company_name}
              </h2>
              <p className="text-md">{ticket?.branches.branch_name}</p>
            </div>
          </div>

          <div className="flex-grow">
            <Label className="text-lg font-bold">Notes</Label>
            <p className="text-md whitespace-pre-line pt-2">
              {ticket.notes && ticket.notes.length > 1
                ? ticket.notes
                : 'No notes!'}
            </p>
          </div>
        </div>

        <aside className="flex flex-col items-center gap-4 p-4">
          <div>
            <p className="font-semibold">Assigned to:</p>
            <Badge className="assignee">{assigned_to.email}</Badge>
          </div>
          <div>
            <p className="font-semibold">Owned by:</p>
            <Badge className="owner">{owned_by.email}</Badge>
          </div>
        </aside>
      </div>
    </div>
  );
}
