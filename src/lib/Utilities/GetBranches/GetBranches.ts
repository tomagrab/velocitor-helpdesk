import { prisma } from '@/lib/Database/Database';

export const getBranches = async (id: number) => {
  try {
    const branches = await prisma.branches.findMany({
      where: { company_id: id },
    });

    if (!branches) {
      console.error('No branches found');
      return;
    }

    return branches;
  } catch (error) {
    console.error(`Error fetching branches: ${error}`);
    return;
  }
};
