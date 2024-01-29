import { Badge } from '@/components/ui/badge';
import LoadingTable from '@/components/Layout/Loading/Table/LoadingTable';

export default function Loading() {
  return (
    <main>
      <div className="flex flex-row items-center gap-2">
        <Badge>...</Badge>
        <h2>Loading...</h2>
      </div>
      <div>
        <h3>
          Branches - <b>Loading...</b>
        </h3>
        <LoadingTable mdGridColumns={3} filters={3} headers={3} rows={3} />
      </div>
      <div>
        <h3>
          Tickets - <b>Loading...</b>
        </h3>
        <LoadingTable mdGridColumns={9} filters={9} headers={9} rows={3} />
      </div>
    </main>
  );
}
