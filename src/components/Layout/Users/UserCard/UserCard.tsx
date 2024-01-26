import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@clerk/nextjs/server';

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback className="break-words">
            {user.firstName && user.lastName
              ? `${user.firstName[0]}${user.lastName[0]}`
              : user.emailAddresses[0].emailAddress[0]}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        {user.username ? (
          <p className="break-words">
            <b>Username</b>: {user.username}
          </p>
        ) : null}
        <p className="break-words">
          <b>Email Address</b>: {user.emailAddresses[0].emailAddress}
        </p>
      </CardContent>
    </Card>
  );
}
