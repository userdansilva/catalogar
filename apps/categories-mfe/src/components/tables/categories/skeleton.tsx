"use client";

import { TableSkeleton } from "@catalogar/shared/table-skeleton";
import { columns } from "./columns";

export function CategoriesSkeleton() {
  return <TableSkeleton columns={columns} />;
}
