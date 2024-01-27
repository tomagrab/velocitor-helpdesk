'use server';

import { supabaseClient } from '@/lib/Database/Supabase';
import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';
import * as z from 'zod';
import { editTicketFormSchema } from './EditTicketForm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateTicket(
  ticketId: number,
  values: z.infer<typeof editTicketFormSchema>,
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
    .upsert([
      {
        ...values,
        user_id: user?.id,
        branch_id: Number(values.branch_id),
      },
    ])
    .eq('id', ticketId);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/tickets/${ticketId}`);
  redirect(`/tickets/${ticketId}`);
}
