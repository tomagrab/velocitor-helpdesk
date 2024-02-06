import { prisma } from '@/lib/Database/Database';

export const getCompanies = async () => {
  try {
    const companies = await prisma.companies.findMany();

    if (!companies) {
      console.error('No companies found');
      return [];
    }

    return companies;
  } catch (error) {
    console.error(`Error fetching companies: ${error}`);
    return [];
  }
};
