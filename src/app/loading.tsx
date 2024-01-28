import LoadingDisplay from '@/components/Layout/Loading/LoadingDisplay';

export default function Loading() {
  return (
    <LoadingDisplay
      title={`Dashboard`}
      message={`the Velocitor Helpdesk Dashboard`}
    />
  );
}
