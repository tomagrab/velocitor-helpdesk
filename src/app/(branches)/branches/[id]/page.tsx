import BranchesDataTable from '@/components/Layout/DataTable/BranchesDataTable/BranchesDataTable';
import TicketsDataTable from '@/components/Layout/DataTable/TicketDataTable/TicketsDataTable';
import { Badge } from '@/components/ui/badge';
import { supabaseClient } from '@/lib/Database/Supabase';
import { Branch } from '@/lib/Types/Branch/Branch';
import { Company } from '@/lib/Types/Company/Company';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { auth } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs/server';

type BranchDetailsProps = {
  params: {
    id: string;
  };
};

const getBranch = async (id: number) => {
  const { getToken } = await auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('branch_id', id);

  if (error) {
    throw error;
  }

  return (data[0] as unknown as Branch) || [];
};

const getCompany = async (id: number) => {
  const { getToken } = await auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('company_id', id);

  if (error) {
    throw error;
  }

  return (data[0] as unknown as Company) || [];
};

const getTicketsForBranch = async (id: number) => {
  const { getToken } = await auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });

  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from('tickets')
    .select(
      `
            ticket_id,
            status,
            priority,
            user_id,
            assigned_to,
            owned_by,
            created_at,
            branches:branches!inner(branch_name, branch_id, company_id, companies:companies!inner(company_name))
    `,
    )
    .eq('branch_id', id);

  if (error) {
    throw error;
  }

  return (data as unknown as Branch[]) || [];
};

export default async function BranchDetails({
  params: { id },
}: BranchDetailsProps) {
  const branch: Branch = (await getBranch(Number(id))) as unknown as Branch;
  const company: Company = (await getCompany(
    branch.company_id,
  )) as unknown as Company;
  const ticketsForBranch: TicketData[] = (await getTicketsForBranch(
    Number(id),
  )) as unknown as TicketData[];
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));

  return (
    <main>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Badge>{branch.branch_id}</Badge>
          <h2>{branch.branch_name}</h2>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Badge>{company.company_id}</Badge>
          <h3>{company.company_name}</h3>
        </div>
      </div>
      <div className="py-4">
        {ticketsForBranch.length > 0 ? (
          <h3>
            {branch.branch_name} has <b>{ticketsForBranch.length}</b> tickets
          </h3>
        ) : ticketsForBranch.length === 1 ? (
          <h3>
            {branch.branch_name} has <b>{ticketsForBranch.length}</b> ticket
          </h3>
        ) : (
          <h3>
            {branch.branch_name} has <b>no</b> tickets
          </h3>
        )}
      </div>
      <div>
        <TicketsDataTable tickets={ticketsForBranch} users={users} />
      </div>
    </main>
  );
}
