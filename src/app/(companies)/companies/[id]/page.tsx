import BranchesDataTable from '@/components/Layout/DataTable/BranchesDataTable/BranchesDataTable';
import TicketsDataTable from '@/components/Layout/DataTable/TicketDataTable/TicketsDataTable';
import { Badge } from '@/components/ui/badge';
import { Branch } from '@/lib/Types/Branch/Branch';
import { Company } from '@/lib/Types/Company/Company';
import { TicketData } from '@/lib/Types/TicketData/TicketData';
import { getBranchesForCompany } from '@/lib/Utilities/GetBranchesForCompany/GetBranchesForCompany';
import { getCompany } from '@/lib/Utilities/GetCompany/GetCompany';
import { getTicketsForCompany } from '@/lib/Utilities/GetTicketsForCompany/GetTicketsForCompany';
import { clerkClient } from '@clerk/nextjs/server';

type CompanyDetailsProps = {
  params: {
    id: string;
  };
};

export default async function CompanyDetails({
  params: { id },
}: CompanyDetailsProps) {
  const company: Company = (await getCompany(Number(id))) as unknown as Company;
  const branches: Branch[] = (await getBranchesForCompany(
    Number(id),
  )) as unknown as Branch[];
  const ticketsForCompany: TicketData[] = (await getTicketsForCompany(
    Number(id),
  )) as unknown as TicketData[];
  const data = await clerkClient.users.getUserList();
  const users = JSON.parse(JSON.stringify(data));

  return (
    <main>
      <div className="flex flex-row items-center gap-2">
        <Badge>{company.company_id}</Badge>
        <h2>{company.company_name}</h2>
      </div>
      <div>
        <h3>
          Branches - <b>{branches.length}</b>
        </h3>
        <BranchesDataTable branches={branches} />
      </div>
      <div>
        <h3>
          Tickets - <b>{ticketsForCompany.length}</b>
        </h3>
        <TicketsDataTable tickets={ticketsForCompany} users={users} />
      </div>
    </main>
  );
}
