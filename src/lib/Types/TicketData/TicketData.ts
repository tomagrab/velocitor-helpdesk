export type TicketData = {
  ticket_id: number;
  status: string | null;
  priority: string | null;
  user_id: string | null;
  assigned_to: string | null;
  owned_by: string | null;
  notes: string | null;
  created_at: string | null;
  branches: {
    branch_name: string;
    companies: {
      company_name: string;
    };
  };
};
