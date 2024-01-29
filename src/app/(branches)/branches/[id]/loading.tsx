import LoadingTable from '@/components/Layout/Loading/Table/LoadingTable';
import { Badge } from '@/components/ui/badge';

export default function Loading() {
  return (
    <main>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Badge>...</Badge>
          <h2>Loading...</h2>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Badge>...</Badge>
          <h3>Loading...</h3>
        </div>
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
