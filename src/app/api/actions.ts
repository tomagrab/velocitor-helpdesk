'use server';

import { supabaseClient } from '@/lib/Database/Supabase';
import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ticketFormSchema } from '@/components/Layout/Tickets/TicketForm/TicketForm';

export async function updateTicket(
  ticketId: number,
  values: z.infer<typeof ticketFormSchema>,
) {
  const { userId, getToken } = auth();
  const user = await currentUser();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  if (!supabase) {
    throw new Error('No supabase client found');
  }

  const { error } = await supabase
    .from('tickets')
    .update([
      {
        ...values,
        assigned_to: values.assigned_to,
        owned_by: values.owned_by,
        user_id: user?.id,
        branch_id: Number(values.branch_id),
      },
    ])
    .eq('ticket_id', ticketId);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/tickets/${ticketId}`);
  redirect(`/tickets/${ticketId}`);
}

export async function addTicket(values: z.infer<typeof ticketFormSchema>) {
  const { userId, getToken } = auth();
  const user = await currentUser();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  if (!supabase) {
    throw new Error('No supabase client found');
  }
  // Insert the ticket
  const insertResponse = await supabase.from('tickets').insert([
    {
      ...values,
      user_id: user?.id,
      assigned_to: values.assigned_to,
      owned_by: values.owned_by,
      branch_id: Number(values.branch_id),
    },
  ]);

  if (insertResponse.error) {
    console.error(insertResponse.error);
    return;
  }

  // Query for the most recent ticket ID created by the user
  const { data, error } = await supabase
    .from('tickets')
    .select('ticket_id')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    return;
  }

  const ticketId = data?.[0]?.ticket_id;
  if (ticketId) {
    revalidatePath(`/tickets/${ticketId}`);
    redirect(`/tickets/${ticketId}?editMode=true`);
  } else {
    console.error('Failed to retrieve ticket ID');
  }
}

export async function cancelTicket() {
  revalidatePath('/tickets');
  redirect('/tickets');
}
