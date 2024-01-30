import LoadingAccordion from '@/components/Layout/Loading/LoadingAccordion/LoadingAccordion';
import UsersLoadingCard from '@/components/Layout/Loading/Users/UsersLoadingCard/UsersLoadingCard';

export default function Loading() {
  return (
    <main>
      <UsersLoadingCard />
      <LoadingAccordion />
    </main>
  );
}
