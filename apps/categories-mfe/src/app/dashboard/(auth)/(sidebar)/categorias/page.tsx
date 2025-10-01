import { Metadata } from "next";
import { Suspense } from "react";
import { Button } from "@catalogar/ui/components/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PrevButton } from "@catalogar/shared/components/inputs/prev-button";
import { PageHeader } from "@catalogar/shared/components/page-header";
import { route as sharedRoute } from "@catalogar/shared/route";
import { CategoriesTable } from "@/components/tables/categories";
import { CategoriesSkeleton } from "@/components/tables/categories/skeleton";
import { route } from "@/route";

export const metadata: Metadata = {
  title: route.categories.title,
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
      <PrevButton url={sharedRoute.dashboard.url} />

      <PageHeader
        title={route.categories.title}
        description="Aqui estão as categorias cadastradas. Adicione, edite, oculte categorias temporárias ou exclua as que não usa mais."
      />

      <Button asChild className="mb-10">
        <Link href={route.categories.sub.new.url}>
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
