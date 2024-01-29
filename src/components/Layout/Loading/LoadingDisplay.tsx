import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

type LoadingDisplayProps = {
  title?: string;
  message?: string;
  children?: React.ReactNode;
};

export default function LoadingDisplay({
  title,
  message,
  children,
}: LoadingDisplayProps) {
  return (
    <main className="flex flex-col items-center gap-4">
      {title ? (
        <h2 className="text-3xl">Velocitor Helpdesk{` | ${title}`}</h2>
      ) : null}
      <Loader2 className="my-4 h-16 w-16 animate-spin" color="#3097b9" />
      <h3 className="text-3xl">Loading{` ${message ? message : null}`}...</h3>

      {children ? children : null}
    </main>
  );
}
