import { prisma } from '@/lib/Database/Database';

export const getBranch = async (id: number) => {
  const branch = await prisma.branches.findUnique({
    where: { branch_id: id },
  });

  if (!branch) {
    console.error('No branch found');
    return;
  }

  return branch;
};
