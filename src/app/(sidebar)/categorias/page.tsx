import { Button } from "@/components/inputs/button";
import { CategoriesTable } from "@/components/tables/categories";
import { CategoriesSkeleton } from "@/components/tables/categories/skeleton";
import { routes } from "@/routes";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

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
    <div>
      <Button asChild className="mb-10">
        <Link href={routes.categories.sub.new.url}>
          <Plus className="size-4" />
          Criar categoria
        </Link>
      </Button>

      <Suspense key={currentPage} fallback={<CategoriesSkeleton />}>
        <CategoriesTable currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
