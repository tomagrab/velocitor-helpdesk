import CompaniesDataTable from '@/components/Layout/DataTable/CompaniesDataTable/CompaniesDataTable';
import { Company } from '@/lib/Types/Company/Company';
import { getCompanies } from '@/lib/Utilities/GetCompanies/GetCompanies';

export default async function Companies() {
  const companies: Company[] = (await getCompanies()) as Company[];

  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Companies</h2>
        <h3>{companies.length}</h3>
      </div>
      <CompaniesDataTable companies={companies} />
    </main>
  );
}
