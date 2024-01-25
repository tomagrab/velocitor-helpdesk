import BranchesDataTable from '@/components/DataTable/BranchesDataTable/BranchesDataTable';
import { supabaseClient } from '@/lib/Database/Supabase';
import { Branch } from '@/lib/Types/Branch/Branch';
import { auth } from '@clerk/nextjs';

const getBranches = async () => {
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });
  if (!supabaseAccessToken) {
    console.error('No access token found');
    return;
  }

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase.from('branches').select('*');

  if (error) {
    throw error;
  }

  return (data as unknown as Branch[]) || [];
};

export default async function Branches() {
  const branches: Branch[] = (await getBranches()) as Branch[];

  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Branches</h2>
        {branches.length > 0 && branches.length != 1 ? (
          <h3>
            There are <b>{branches.length}</b> branches
          </h3>
        ) : branches.length === 1 ? (
          <h3>
            There is <b>1</b> company
          </h3>
        ) : branches.length === 0 ? (
          <h3>
            There are <b>0</b> branches
          </h3>
        ) : null}
      </div>
      <BranchesDataTable branches={branches} />
    </main>
  );
}
