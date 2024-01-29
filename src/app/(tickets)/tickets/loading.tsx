import LoadingDisplay from '@/components/Layout/Loading/LoadingDisplay';

export default function Loading() {
  return (
    <LoadingDisplay
      title={`Tickets`}
      message={`the Velocitor Helpdesk Tickets List`}
    />
  );
}