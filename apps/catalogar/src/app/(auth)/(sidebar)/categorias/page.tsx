import { Metadata } from "next";
import { Suspense } from "react";
import { CategoriesTable } from "@/components/tables/categories";
import { CategoriesSkeleton } from "@/components/tables/categories/skeleton";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.categories.title,
};

export default async function Categories({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <Suspense key={currentPage} fallback={<CategoriesSkeleton />}>
      <CategoriesTable currentPage={currentPage} />
    </Suspense>
  );
}
