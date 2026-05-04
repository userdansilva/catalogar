import type { Metadata } from "next";
import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.new.title,
};

export default async function NewCatalogItem({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const [{ productTypes }, { categories }] = await Promise.all([
    getProductTypes(),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <PrevButton url={routes.catalogItems.url} />

      <PageHeader title={routes.catalogItems.sub.new.title} />

      <CreateCatalogItemForm
        productTypes={productTypes}
        categories={categories}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
