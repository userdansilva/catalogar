import { TableSkeleton } from "../table-skeleton";
import { columns } from "./columns";

export function ProductTypesSkeleton() {
  return <TableSkeleton columns={columns} />;
}
