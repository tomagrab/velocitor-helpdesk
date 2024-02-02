import * as XLSX from 'xlsx';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { User } from '@clerk/nextjs/server';

export async function exportTicketsToXLSX(
  tickets: TicketData[],
  users: User[],
) {
  // Transform the ticket data into a format that XLSX can understand
  const rows = tickets.map(ticket => ({
    'Ticket ID': ticket.ticket_id,
    'Branch Name': ticket.branches.branch_name,
    'Company Name': ticket.branches.companies.company_name,
    Status: ticket.status,
    Priority: ticket.priority,
    'Assigned To':
      users.find(user => user.id === ticket.assigned_to)?.emailAddresses[0]
        .emailAddress || 'Unassigned',
    'Owned By':
      users.find(user => user.id === ticket.owned_by)?.emailAddresses[0]
        .emailAddress || 'Unowned',
    Notes: ticket.notes,
    'Created At': ticket.created_at ? new Date(ticket.created_at) : 'No date',
  }));

  // Generate a new worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');

  // Write the workbook to a file
  XLSX.writeFile(workbook, 'Tickets.xlsx', { compression: true });
}
