import CompaniesDataTable from '@/components/Layout/DataTable/CompaniesDataTable/CompaniesDataTable';
import { supabaseClient } from '@/lib/Database/Supabase';
import { Company } from '@/lib/Types/Company/Company';
import { auth } from '@clerk/nextjs';

const getCompanies = async () => {
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });
  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase.from('companies').select('*');

  if (error) {
    throw error;
  }

  return (data as unknown as Company[]) || [];
};

export default async function Companies() {
  const companies: Company[] = (await getCompanies()) as Company[];

  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Companies</h2>
        {companies.length > 0 && companies.length != 1 ? (
          <h3>
            There are <b>{companies.length}</b> companies
          </h3>
        ) : companies.length === 1 ? (
          <h3>
            There is <b>1</b> company
          </h3>
        ) : companies.length === 0 ? (
          <h3>
            There are <b>0</b> companies
          </h3>
        ) : null}
      </div>
      <CompaniesDataTable companies={companies} />
    </main>
  );
}
