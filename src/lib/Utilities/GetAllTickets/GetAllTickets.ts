import { prisma } from '@/lib/Database/Database';

export async function getAllTickets() {
  try {
    const tickets = await prisma.tickets.findMany({
      include: {
        branches: {
          include: {
            companies: true,
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
    console.error(error);
    return [];
  }
}
