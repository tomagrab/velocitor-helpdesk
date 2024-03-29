'use server';
import { prisma } from '@/lib/Database/Database';

export const getOwnedTickets = async (userId: string) => {
  try {
    const ownedTickets = await prisma.tickets.findMany({
      where: {
        owned_by: userId,
      },
      include: {
        branches: {
          include: {
            companies: true,
          },
        },
      },
    });

    if (!ownedTickets) {
      console.error('No tickets found');
      return [];
    }

    return ownedTickets;
  } catch (error) {
    console.error(error);
    return [];
  }
};
