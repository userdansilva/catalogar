import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/inputs/button";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { ProductTypesTable } from "@/components/tables/product-types";
import { ProductTypesSkeleton } from "@/components/tables/product-types/skeleton";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.productTypes.title,
};

export default async function Page() {
  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <PageHeader
        title={routes.productTypes.title}
        description="Aqui estão os tipos de produto cadastrados. Adicione, edite, oculte produtos temporários ou exclua os que não vende mais."
      />

      <Button asChild className="mb-10">
        <Link href={routes.productTypes.sub.new.url}>
          <Plus />
          Adicionar
        </Link>
      </Button>

      <Suspense fallback={<ProductTypesSkeleton />}>
        <ProductTypesTable />
      </Suspense>
    </div>
  );
}
