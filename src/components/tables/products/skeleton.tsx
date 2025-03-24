import { columns } from "./columns";
import { TableSkeleton } from "../table-skeleton";

export function ProductsSkeleton() {
  return (
    <TableSkeleton columns={columns} />
  );
}
