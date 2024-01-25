import BranchesDataTable from '@/components/DataTable/BranchesDataTable/BranchesDataTable';
import { Badge } from '@/components/ui/badge';
import { supabaseClient } from '@/lib/Database/Supabase';
import { Branch } from '@/lib/Types/Branch/Branch';
import { Company } from '@/lib/Types/Company/Company';
import { auth } from '@clerk/nextjs';

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

export default async function BranchDetails({
  params: { id },
}: BranchDetailsProps) {
  const branch: Branch = (await getBranch(Number(id))) as unknown as Branch;
  const company: Company = (await getCompany(
    branch.company_id,
  )) as unknown as Company;

  return (
    <main>
      <div className="flex flex-row items-center gap-2">
        <Badge>{branch.branch_id}</Badge>
        <h2>{branch.branch_name}</h2>
      </div>
      <div>
        <h3>Company</h3>
        <div className="flex flex-row items-center gap-2">
          <Badge>{company.company_id}</Badge>
          <h4>{company.company_name}</h4>
        </div>
      </div>
    </main>
  );
}
