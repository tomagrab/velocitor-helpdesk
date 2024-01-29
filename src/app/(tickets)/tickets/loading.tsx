import LoadingTable from '@/components/Layout/Loading/Table/LoadingTable';

export default function Loading() {
  return (
    <main>
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex flex-row items-baseline gap-2">
          <h2>Tickets</h2>
          <h3>Loading...</h3>
        </div>
      </div>
      <LoadingTable mdGridColumns={9} filters={9} headers={9} rows={10} />
    </main>
  );
}
