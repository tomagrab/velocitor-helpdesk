import LoadingDisplay from '@/components/Layout/Loading/LoadingDisplay';

export default function Loading() {
  return (
    <LoadingDisplay
      title={`Users`}
      message={`the Velocitor Helpdesk Users List`}
    />
  );
}
