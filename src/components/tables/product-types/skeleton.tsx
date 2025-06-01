import { columns } from "./columns";
import { TableSkeleton } from "../table-skeleton";

export function ProductTypesSkeleton() {
  return (
    <TableSkeleton columns={columns} />
  );
}
