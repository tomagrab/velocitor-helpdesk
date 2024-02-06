import { prisma } from '@/lib/Database/Database';

export const getBranches = async () => {
  try {
    const branches = await prisma.branches.findMany();
    return branches;
  } catch (error) {
    console.error(`Error fetching branches: ${error}`);
    return [];
  }
};
