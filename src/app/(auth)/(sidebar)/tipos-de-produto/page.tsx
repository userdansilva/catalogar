import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/inputs/button";
import { ProductTypesTable } from "@/components/tables/product-types";
import { ProductTypesSkeleton } from "@/components/tables/product-types/skeleton";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.productTypes.title,
};

export default async function Page({
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
        <Link href={routes.productTypes.sub.new.url}>
          <Plus />
          Criar Tipo de Produto
        </Link>
      </Button>

      <Suspense key={currentPage} fallback={<ProductTypesSkeleton />}>
        <ProductTypesTable currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
