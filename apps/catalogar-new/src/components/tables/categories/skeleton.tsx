"use client";

import { TableSkeleton } from "../table-skeleton";
import { columns } from "./columns";

export function CategoriesSkeleton() {
  return <TableSkeleton columns={columns} />;
}
