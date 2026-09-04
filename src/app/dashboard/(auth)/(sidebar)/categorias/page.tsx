import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { CategoriesTable } from "@/components/tables/categories";
import { CategoriesSkeleton } from "@/components/tables/categories/skeleton";
import { routes } from "@/routes";

export const instant = false;

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

      <Link
        href={routes.categories.sub.new.url}
        className={buttonVariants({
          className: "mb-10",
        })}
      >
        <Plus />
        Adicionar
      </Link>

      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesTable />
      </Suspense>
    </div>
  );
}
