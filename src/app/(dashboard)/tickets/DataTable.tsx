'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-2 py-4">
        <Input
          placeholder="Filter Ticket #..."
          className="max-w-sm"
          value={
            (table.getColumn('ticket_id')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('ticket_id')?.setFilterValue(event.target.value)
          }
        />
        <Input
          placeholder="Filter Branch..."
          className="max-w-sm"
          value={
            (table
              .getColumn('branches_branch_name')
              ?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table
              .getColumn('branches_branch_name')
              ?.setFilterValue(event.target.value)
          }
        />
        <Input
          placeholder="Filter Company..."
          className="max-w-sm"
          value={
            (table
              .getColumn('branches_companies.company_name')
              ?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table
              .getColumn('branches_companies.company_name')
              ?.setFilterValue(event.target.value)
          }
        />
        <Input
          placeholder="Filter Status..."
          className="max-w-sm"
          value={(table.getColumn('status')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('status')?.setFilterValue(event.target.value)
          }
        />
        <Input
          placeholder="Filter Priority..."
          className="max-w-sm"
          value={
            (table.getColumn('priority')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('priority')?.setFilterValue(event.target.value)
          }
        />
        <Input
          placeholder="Filter Creator..."
          className="max-w-sm"
          value={
            (table.getColumn('user_fullName')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('user_fullName')?.setFilterValue(event.target.value)
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id === 'ticket_id'
                      ? 'Ticket #'
                      : column.id === 'branches_branch_name'
                        ? 'Branch'
                        : column.id === 'branches_companies.company_name'
                          ? 'Company'
                          : column.id === 'user_fullName'
                            ? 'Creator'
                            : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
