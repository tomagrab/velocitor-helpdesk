export type TicketData = {
  ticket_id: number;
  status: string | null;
  priority: string | null;
  user_fullName?: string | null;
  user_email?: string | null;
  notes?: string | null;
  branches: {
    branch_name: string;
    companies: {
      company_name: string;
    };
  };
};
