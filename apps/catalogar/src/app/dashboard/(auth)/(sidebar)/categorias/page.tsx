import { Metadata } from "next";
import { Suspense } from "react";
import { Button } from "@catalogar/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CategoriesTable } from "@/components/tables/categories";
import { CategoriesSkeleton } from "@/components/tables/categories/skeleton";
import { routes } from "@/routes";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";

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
    <div className="space-y-6">
      <PrevButton url={routes.dashboard.url} />

      <PageHeader
        title={routes.categories.title}
        description="Aqui estão as categorias cadastradas. Adicione, edite, oculte categorias temporárias ou exclua as que não usa mais."
      />

      <Button asChild className="mb-10">
        <Link href={routes.categories.sub.new.url}>
          <Plus />
          Adicionar
        </Link>
      </Button>

      <Suspense key={currentPage} fallback={<CategoriesSkeleton />}>
        <CategoriesTable currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
