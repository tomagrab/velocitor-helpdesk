import { supabaseClient } from '@/lib/Database/Supabase';
import { auth } from '@clerk/nextjs/server';
import { Company } from '@/lib/Types/Company/Company';
import { clerkClient } from '@clerk/nextjs/server';
import TicketForm from '@/components/Layout/Ticket/TicketForm/TicketForm';

const getCompanies = async () => {
  const { getToken } = auth();

  if (!getToken) {
    console.error('Failed to get access token');
    return;
  }

  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('Failed to get access token');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  if (!supabase) {
    console.error('Failed to get supabase client');
    return;
  }

  const { data } = await supabase.from('companies').select('*');

  return data as Company[];
};

export default async function Create() {
  const companies: Company[] = (await getCompanies()) as Company[];
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));

  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Create</h2>
        <h3>Create a new ticket</h3>
      </div>
      <TicketForm companies={companies} users={users} editMode={false} />
    </main>
  );
}
