import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export default function TicketLoadingCard() {
  return (
    <div className="relative w-full p-4 shadow-lg">
      <div className="flex">
        <div className="flex grow flex-col gap-4 ">
          <div className="flex flex-row items-center gap-2">
            <div>
              <h2 className="text-xl font-bold">Company Loading...</h2>
              <p className="text-md">Branch Loading...</p>
            </div>
          </div>

          <div className="flex-grow">
            <Label className="text-lg font-bold">Notes</Label>
            <p className="text-md whitespace-pre-line pt-2">Notes Loading...</p>
          </div>
        </div>

        <aside className="flex flex-col  gap-4 p-4">
          <div>
            <p className="font-semibold">Status:</p>
            <Badge className={`status`}>Loading...</Badge>
          </div>

          <div>
            <p className="font-semibold">Priority:</p>
            <Badge className={`priority`}>Loading...</Badge>
          </div>

          <div>
            <p className="font-semibold">Assigned to:</p>
            <Badge className="bg-sky-500 hover:bg-sky-400">Loading...</Badge>
          </div>
          <div>
            <p className="font-semibold">Owned by:</p>
            <Badge className="bg-emerald-500 hover:bg-emerald-400">
              Loading...
            </Badge>
          </div>
        </aside>
      </div>
    </div>
  );
}
