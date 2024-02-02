import * as XLSX from 'xlsx';
import { Branch } from '@/lib/Types/Branch/Branch';

export async function exportBranchesToXLSX(branches: Branch[]) {
  // Transform the branch data into a format that XLSX can understand
  const rows = branches.map(branch => ({
    'Branch ID': branch.branch_id,
    'Branch Name': branch.branch_name,
  }));

  // Generate a new worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Branches');

  // Write the workbook to a file
  XLSX.writeFile(workbook, 'Branches.xlsx', { compression: true });
}
