import { Loader, Loader2 } from 'lucide-react';

type LoadingDisplayProps = {
  title?: string;
  message?: string;
};

export default function LoadingDisplay({
  title,
  message,
}: LoadingDisplayProps) {
  return (
    <main className="flex flex-col items-center gap-4">
      <Loader2 className="h-16 w-16 animate-spin" color="#3097b9" />
      {title ? (
        <h2 className="text-3xl">Velocitor Helpdesk{` | ${title}`}</h2>
      ) : null}
      <h3 className="text-3xl">Loading{` ${message ? message : null}`}...</h3>
    </main>
  );
}
