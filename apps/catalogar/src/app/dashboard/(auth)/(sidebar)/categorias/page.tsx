import { Button } from "@catalogar/ui/components/button";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { CategoriesTable } from "@/components/tables/categories";
import { CategoriesSkeleton } from "@/components/tables/categories/skeleton";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.categories.title,
};

export default async function Categories() {
  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

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

      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesTable />
      </Suspense>
    </div>
  );
}
