import { prisma } from '@/lib/Database/Database';

export const getTicketsForCompany = async (id: number) => {
  try {
    const tickets = await prisma.tickets.findMany({
      where: {
        branches: {
          company_id: id,
        },
      },
      select: {
        ticket_id: true,
        status: true,
        priority: true,
        user_id: true,
        assigned_to: true,
        owned_by: true,
        created_at: true,
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
  } catch (error) {
    console.error(`Error fetching tickets: ${error}`);
    return [];
  }
};
