"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";

type TableSkeletonProps<TData, TValues> = {
  columns: ColumnDef<TData, TValues>[];
};

export function TableSkeleton<TData, TValues>({
  columns,
}: TableSkeletonProps<TData, TValues>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>{column.header?.toString()}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow
              key={index.toString()}
              className="h-[49px] hover:bg-transparent"
            >
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Skeleton className="h-3 w-2/3" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
