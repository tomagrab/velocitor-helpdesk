import TicketsDataTable from '@/components/Layout/DataTable/TicketDataTable/TicketsDataTable';
import { Badge } from '@/components/ui/badge';
import { Branch } from '@/lib/Types/Branch/Branch';
import { Company } from '@/lib/Types/Company/Company';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { getBranch } from '@/lib/Utilities/GetBranch/GetBranch';
import { getCompany } from '@/lib/Utilities/GetCompany/GetCompany';
import { getTicketsForBranch } from '@/lib/Utilities/GetTicketsForBranch/GetTicketsForBranch';
import { clerkClient } from '@clerk/nextjs/server';

type BranchDetailsProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: BranchDetailsProps) {
  const branch: Branch = (await getBranch(Number(id))) as unknown as Branch;
  const company: Company = (await getCompany(
    branch.company_id,
  )) as unknown as Company;

  return {
    title: `Velocitor Helpdesk | ${branch.branch_name}`,
    description: `The branch ${branch.branch_name} of the company ${company.company_name}.`,
  };
}

export default async function BranchDetails({
  params: { id },
}: BranchDetailsProps) {
  const branch: Branch = (await getBranch(Number(id))) as unknown as Branch;
  const company: Company = (await getCompany(
    branch.company_id,
  )) as unknown as Company;
  const ticketsForBranch: TicketData[] = (await getTicketsForBranch(
    Number(id),
  )) as unknown as TicketData[];
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));

  return (
    <main>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Badge>{branch.branch_id}</Badge>
          <h2>{branch.branch_name}</h2>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Badge>{company.company_id}</Badge>
          <h3>{company.company_name}</h3>
        </div>
      </div>

      <div>
        <h3>
          Tickets - <b>{ticketsForBranch.length}</b>
        </h3>
        <TicketsDataTable tickets={ticketsForBranch} users={users} />
      </div>
    </main>
  );
}
