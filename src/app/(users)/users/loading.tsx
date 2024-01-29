import LoadingDisplay from '@/components/Layout/Loading/LoadingDisplay';
import UsersLoadingCard from '@/components/Layout/Loading/Users/UsersLoadingCard/UsersLoadingCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main>
      <div className="flex flex-row items-baseline gap-2 pb-4">
        <h2>Users</h2>
        <h3>
          There are <b>loading... Velocitor Helpdesk</b> users
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <UsersLoadingCard />
        <UsersLoadingCard />
        <UsersLoadingCard />
        <UsersLoadingCard />
        <UsersLoadingCard />
        <UsersLoadingCard />
        <UsersLoadingCard />
        <UsersLoadingCard />
        <UsersLoadingCard />
      </div>
    </main>
  );
}
