import { currentUser } from '@clerk/nextjs/server';
import { Company } from '@/lib/Types/Company/Company';
import { clerkClient } from '@clerk/nextjs/server';
import TicketForm from '@/components/Layout/Ticket/TicketForm/TicketForm';
import { getCompanies } from '@/lib/Utilities/GetCompanies/GetCompanies';

export default async function Create() {
  const companies: Company[] = (await getCompanies()) as Company[];
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));
  const signedInUser = await currentUser();
  console.log(signedInUser);

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
