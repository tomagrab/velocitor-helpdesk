import BranchesDataTable from '@/components/Layout/DataTable/BranchesDataTable/BranchesDataTable';
import { prisma } from '@/lib/Database/Database';
import { Branch } from '@/lib/Types/Branch/Branch';

const getBranches = async () => {
  try {
    const branches = await prisma.branches.findMany();
    return branches;
  } catch (error) {
    console.error(`Error fetching branches: ${error}`);
    return [];
  }
};

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
