import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

type ColumnHeaderProps = {
  title: string;
  clickEvent: () => void;
};

export default function ColumnHeader({ title, clickEvent }: ColumnHeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <Button
        variant="ghost"
        onClick={clickEvent}
        className="flex items-center gap-2"
      >
        {title}
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
