import Link from 'next/link';
import TicketsDataTable from '@/components/Layout/DataTable/TicketDataTable/TicketsDataTable';
import { Badge } from '@/components/ui/badge';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { clerkClient } from '@clerk/nextjs/server';
import { getAllTickets } from '@/lib/Utilities/GetAllTickets/GetAllTickets';

export default async function Tickets() {
  const tickets: TicketData[] =
    (await getAllTickets()) as unknown as TicketData[];
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));

  return (
    <main>
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex flex-row items-baseline gap-2">
          <h2>Tickets</h2>
          <h3>{tickets.length}</h3>
        </div>

        <Link href="/tickets/create">
          <Badge className="bg-green-500 hover:bg-green-400">Create</Badge>
        </Link>
      </div>

      <TicketsDataTable tickets={tickets} users={users} />
    </main>
  );
}
