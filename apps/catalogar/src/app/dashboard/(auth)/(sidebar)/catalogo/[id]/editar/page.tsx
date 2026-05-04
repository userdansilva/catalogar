import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdateCatalogItemForm } from "@/components/forms/update-catalog-item-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { routes } from "@/routes";
import { getCatalogItem } from "@/services/get-catalog-item";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.edit.title,
};

export default async function EditCatalogItem({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const [{ catalogItem }, { productTypes }, { categories }] = await Promise.all(
    [getCatalogItem(id), getProductTypes(), getCategories()],
  );

  if (!catalogItem) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PrevButton url={routes.catalogItems.url} />

      <PageHeader
        title={catalogItem.title}
        description="Altere os dados e clique em salvar alterações!"
      />

      <UpdateCatalogItemForm
        catalogItem={catalogItem}
        productTypes={productTypes}
        categories={categories}
      />
    </div>
  );
}
