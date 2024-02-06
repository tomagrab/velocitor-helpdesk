'use server';
import { prisma } from '@/lib/Database/Database';

export const getAssignedTickets = async (userId: string) => {
  try {
    const assignedTickets = await prisma.tickets.findMany({
      where: {
        assigned_to: userId,
      },
      include: {
        branches: {
          include: {
            companies: true,
          },
        },
      },
    });

    if (!assignedTickets) {
      console.error('No tickets found');
      return [];
    }

    return assignedTickets;
  } catch (error) {
    console.error(error);
    return [];
  }
};
