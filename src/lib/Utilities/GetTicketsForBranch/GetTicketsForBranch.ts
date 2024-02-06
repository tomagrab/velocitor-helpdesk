import { prisma } from '@/lib/Database/Database';

export const getTicketsForBranch = async (id: number) => {
  const tickets = await prisma.tickets.findMany({
    where: { branch_id: id },
    include: {
      branches: {
        select: {
          branch_name: true,
          branch_id: true,
          company_id: true,
          companies: {
            select: {
              company_name: true,
            },
          },
        },
      },
    },
  });

  if (!tickets) {
    console.error('No tickets found');
    return [];
  }

  return tickets;
};
