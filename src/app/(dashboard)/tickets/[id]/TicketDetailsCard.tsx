'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabaseClient } from '@/lib/Database/Supabase';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

type TicketDetailsProps = {
  id: Number;
};

export default function TicketDetailsCard({ id }: TicketDetailsProps) {
  const { getToken } = useAuth();
  const [ticket, setTicket] = useState<TicketData>();

  useEffect(() => {
    const fetchTicket = async () => {
      const supabaseAccessToken = await getToken({ template: 'supabase' });
      if (!supabaseAccessToken) {
        console.error('No access token found');
        return;
      }
      const supabase = await supabaseClient(supabaseAccessToken);
      const { data } = await supabase
        .from('tickets')
        .select(
          `
            ticket_id,
            status,
            priority,
            user_fullName,
            branches:branches!inner(branch_name, companies:companies!inner(company_name))
      `,
        )
        .eq('ticket_id', id);

      setTicket(data![0] as unknown as TicketData);
    };

    fetchTicket();
  }, [getToken]);

  return (
    <Card>
      <CardHeader className="relative">
        <Badge className="absolute right-4 top-4" color="primary">
          Ticket # {ticket?.ticket_id}
        </Badge>
        <CardTitle className="flex items-center">
          <h2>{ticket?.branches.companies.company_name}</h2>
          {` - `}
          <h3>{ticket?.branches.branch_name}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{ticket?.branches.branch_name}</p>
        <p>{ticket?.branches.companies.company_name}</p>
        <p>{ticket?.ticket_id}</p>
        <p>{ticket?.user_fullName}</p>
        <p>{ticket?.status}</p>
        <p>{ticket?.priority}</p>
      </CardContent>
    </Card>
  );
}
