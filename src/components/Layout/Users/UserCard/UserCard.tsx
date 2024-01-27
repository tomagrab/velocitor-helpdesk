import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User } from '@clerk/nextjs/server';
import Link from 'next/link';

type UserCardProps = {
  user: User;
  showProfileLink?: boolean;
};

export default function UserCard({ user, showProfileLink }: UserCardProps) {
  return (
    <Card>
      <CardHeader className="relative flex flex-col items-center gap-2">
        {showProfileLink ? (
          <Badge className="absolute right-4 top-4 bg-green-500 hover:bg-green-400">
            <Link href={`/users/${user.id}`}>Profile</Link>
          </Badge>
        ) : null}
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
