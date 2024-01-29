import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function UsersLoadingCard() {
  return (
    <Card>
      <CardHeader className="relative flex flex-col items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="absolute right-4 top-4 h-6 w-24" />
      </CardHeader>
      <CardContent>
        <p>
          <Skeleton className="h-4 w-3/4" />
        </p>
        <p>
          <Skeleton className="h-4 w-1/2" />
        </p>
      </CardContent>
    </Card>
  );
}
