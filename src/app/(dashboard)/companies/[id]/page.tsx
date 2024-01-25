import BranchesDataTable from '@/components/BranchesDataTable/BranchesDataTable';
import { Badge } from '@/components/ui/badge';
import { supabaseClient } from '@/lib/Database/Supabase';
import { Branch } from '@/lib/Types/Branch/Branch';
import { Company } from '@/lib/Types/Company/Company';
import { auth } from '@clerk/nextjs';

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

  console.log(data[0]);

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

export default async function CompanyDetails({
  params: { id },
}: CompanyDetailsProps) {
  const company: Company = (await getCompany(Number(id))) as unknown as Company;
  const branches: Branch[] = (await getBranches(
    Number(id),
  )) as unknown as Branch[];
  return (
    <main>
      <div className="flex flex-row items-center gap-2">
        <Badge>{company.company_id}</Badge>
        <h2>{company.company_name}</h2>
      </div>
      <div>
        <BranchesDataTable branches={branches} />
      </div>
    </main>
  );
}
