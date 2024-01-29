import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type TableLoadingProps = {
  mdGridColumns: number;
  filters: number;
  headers: number;
  rows: number;
};

export default function LoadingTable({
  mdGridColumns,
  filters,
  headers,
  rows,
}: TableLoadingProps) {
  return (
    <>
      <div
        className={`grid grid-cols-3 gap-2 py-4 md:grid-cols-${mdGridColumns}`}
      >
        {Array.from({ length: filters }).map((_, i) => (
          <Skeleton className="h-10 w-full border-2 border-input" key={i} />
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: headers }).map((_, i) => (
              <TableHead key={i}>
                <div className="flex flex-col items-center">
                  <Skeleton className="h-10 w-24" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: headers }).map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-10 w-24" />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
