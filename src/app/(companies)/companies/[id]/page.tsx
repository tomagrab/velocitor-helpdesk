import BranchesDataTable from '@/components/Layout/DataTable/BranchesDataTable/BranchesDataTable';
import TicketsDataTable from '@/components/Layout/DataTable/TicketDataTable/TicketsDataTable';
import { Badge } from '@/components/ui/badge';
import { supabaseClient } from '@/lib/Database/Supabase';
import { Branch } from '@/lib/Types/Branch/Branch';
import { Company } from '@/lib/Types/Company/Company';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { auth } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs/server';

type CompanyDetailsProps = {
  params: {
    id: string;
  };
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

const getBranches = async (id: number) => {
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
    .eq('company_id', id);

  if (error) {
    throw error;
  }

  return (data as unknown as Branch[]) || [];
};

const getTicketsForCompany = async (id: number) => {
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
            branches:branches!inner(branch_name, branch_id, company_id,
            companies:companies!inner(company_name))
  `,
    )
    .eq('branches.company_id', id);

  if (error) {
    throw error;
  }

  return (data as unknown as TicketData[]) || [];
};

export default async function CompanyDetails({
  params: { id },
}: CompanyDetailsProps) {
  const company: Company = (await getCompany(Number(id))) as unknown as Company;
  const branches: Branch[] = (await getBranches(
    Number(id),
  )) as unknown as Branch[];
  const ticketsForCompany: TicketData[] = (await getTicketsForCompany(
    Number(id),
  )) as unknown as TicketData[];
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));

  return (
    <main>
      <div className="flex flex-row items-center gap-2">
        <Badge>{company.company_id}</Badge>
        <h2>{company.company_name}</h2>
      </div>
      <div>
        <h3>Branches</h3>
        <BranchesDataTable branches={branches} />
      </div>
      <div>
        <h3>
          Tickets - <b>{ticketsForCompany.length}</b>
        </h3>
        <TicketsDataTable tickets={ticketsForCompany} users={users} />
      </div>
    </main>
  );
}
