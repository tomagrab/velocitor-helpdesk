import UserCard from '@/components/Layout/Users/UserCard/UserCard';
import { clerkClient } from '@clerk/nextjs';

export default async function Users() {
  const users = await clerkClient.users.getUserList();

  return (
    <main>
      <div className="flex flex-row items-baseline gap-2">
        <h2>Users</h2>
        <h3>
          There are <b>{users.length} Velocitor Helpdesk</b> users
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <UserCard key={user.id} user={user} showProfileLink={true} />
        ))}
      </div>
    </main>
  );
}
