import * as XLSX from 'xlsx';
import { Company } from '@/lib/Types/Company/Company';

export async function exportCompaniesToXLSX(companies: Company[]) {
  // Transform the company data into a format that XLSX can understand
  const rows = companies.map(company => ({
    'Company ID': company.company_id,
    'Company Name': company.company_name,
  }));

  // Generate a new worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Companies');

  // Write the workbook to a file
  XLSX.writeFile(workbook, 'Companies.xlsx', { compression: true });
}
