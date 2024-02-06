import { prisma } from '@/lib/Database/Database';

export const getCompany = async (id: number) => {
  try {
    const company = await prisma.companies.findUnique({
      where: { company_id: id },
    });

    if (!company) {
      console.error('No company found');
      return;
    }

    return company;
  } catch (error) {
    console.error(`Error fetching company: ${error}`);
    return;
  }
};
