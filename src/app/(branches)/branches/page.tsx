import BranchesDataTable from '@/components/Layout/DataTable/BranchesDataTable/BranchesDataTable';
import { Branch } from '@/lib/Types/Branch/Branch';
import { getBranches } from '@/lib/Utilities/GetBranches/GetBranches';

export default async function Branches() {
  const branches: Branch[] = (await getBranches()) as Branch[];

  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Branches</h2>
        <h3>{branches.length}</h3>
      </div>
      <BranchesDataTable branches={branches} />
    </main>
  );
}
