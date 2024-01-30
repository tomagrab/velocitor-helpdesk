import LoadingAccordion from '@/components/Layout/Loading/LoadingAccordion/LoadingAccordion';

export default function Loading() {
  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Dashboard</h2>
      </div>

      <LoadingAccordion />
    </main>
  );
}
