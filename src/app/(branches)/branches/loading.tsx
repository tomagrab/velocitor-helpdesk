import LoadingTable from '@/components/Layout/Loading/Table/LoadingTable';

export default function Loading() {
  return (
    <main>
      <div className="flex flex-row items-center justify-between pb-4">
        <div className="flex flex-row items-baseline gap-2">
          <h2>Branches</h2>
          <h3>Loading...</h3>
        </div>
      </div>
      <LoadingTable mdGridColumns={3} filters={3} headers={3} rows={5} />
    </main>
  );
}
