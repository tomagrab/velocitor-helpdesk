import { prisma } from '@/lib/Database/Database';

export const getTicket = async (id: number) => {
  try {
    const ticket = await prisma.tickets.findUnique({
      where: {
        ticket_id: id,
      },
      include: {
        branches: {
          include: {
            companies: true,
          },
        },
      },
    });

    if (!ticket) {
      console.error('No ticket found');
      return [];
    }

    return ticket;
  } catch (error) {
    console.error(error);
    return [];
  }
};
