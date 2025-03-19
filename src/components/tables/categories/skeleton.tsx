"use client";

/* eslint-disable react/no-array-index-key */

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/shadcn/components/ui/table";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { columns } from "./columns";

export function CategoriesSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>
                {column.header?.toString()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow
              key={index.toString()}
              className="hover:bg-transparent h-[49px]"
            >
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Skeleton className="w-2/3 h-3" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
