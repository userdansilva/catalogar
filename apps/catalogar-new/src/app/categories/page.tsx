import { Suspense } from "react";
import { CategoriesTable } from "@/components/tables/categories";
import { CategoriesTableSkeleton } from "@/components/tables/categories/skeleton";

export default function CategoriesPage() {
  return (
    <div>
      <h1>This is categories</h1>

      <Suspense fallback={<CategoriesTableSkeleton />}>
        <CategoriesTable />
      </Suspense>
    </div>
  );
}
