import Link from 'next/link';
import TicketDataTable from './TicketDataTable';
import { Badge } from '@/components/ui/badge';

export default function Tickets() {
  return (
    <main>
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex flex-row items-center gap-2">
          <h2>Tickets</h2>
          <h3>Currently open tickets</h3>
        </div>

        <Link href="/tickets/create">
          <Badge className="bg-green-500 hover:bg-green-400">Create</Badge>
        </Link>
      </div>

      <TicketDataTable />
    </main>
  );
}
