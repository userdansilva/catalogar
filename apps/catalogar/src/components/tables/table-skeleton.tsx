import { ColumnDef } from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@catalogar/ui/components/table";
import { Skeleton } from "@catalogar/ui/components/skeleton";

export function TableSkeleton<TData, TValues>({
  columns,
}: {
  columns: ColumnDef<TData, TValues>[];
}) {
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
          {Array.from({ length: 10 }, () => uuidv4()).map((id) => (
            <TableRow key={id} className="h-[49px] hover:bg-transparent">
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
