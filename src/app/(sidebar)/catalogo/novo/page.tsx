import { Metadata } from "next";
import { routes } from "@/routes";
import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { getProductTypes } from "@/services/get-product-types";
import { getCategories } from "@/services/get-categories";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.new.title,
};

export default async function NewCatalogItem({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;

  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();

  return (
    <CreateCatalogItemForm
      productTypes={productTypes}
      categories={categories}
      callbackUrl={callbackUrl}
    />
  );
}
