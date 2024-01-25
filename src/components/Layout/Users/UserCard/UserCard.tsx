import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@clerk/nextjs/server';

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>
            {user.firstName && user.lastName
              ? `${user.firstName[0]}${user.lastName[0]}`
              : user.emailAddresses[0].emailAddress[0]}
          </AvatarFallback>
        </Avatar>
        <CardTitle>
          {user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.emailAddresses[0].emailAddress}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <b>Username</b>: {user.username}
        </p>
        <p>
          <b>Email Address</b>: {user.emailAddresses[0].emailAddress}
        </p>
      </CardContent>
    </Card>
  );
}
