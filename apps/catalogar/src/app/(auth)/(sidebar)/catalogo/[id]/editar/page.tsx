import { Metadata } from "next";
import { UpdateCatalogItemForm } from "@/components/forms/update-catalog-item-form";
import { routes } from "@/routes";
import { getCatalogItemById } from "@/services/get-catalog-item-by-id";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { ExpectedError } from "@/components/error-handling/expected-error";

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

  const [
    [catalogItemError, catalogItemData],
    [productTypesError, productTypesData],
    [categoriesError, categoriesData],
  ] = await Promise.all([
    getCatalogItemById(id),
    getProductTypes(),
    getCategories(),
  ]);

  if (catalogItemError) {
    return <ExpectedError error={catalogItemError} />;
  }

  if (productTypesError) {
    return <ExpectedError error={productTypesError} />;
  }

  if (categoriesError) {
    return <ExpectedError error={categoriesError} />;
  }

  const catalogItem = catalogItemData.data;
  const productTypes = productTypesData.data;
  const categories = categoriesData.data;

  return (
    <UpdateCatalogItemForm
      catalogItem={catalogItem}
      productTypes={productTypes}
      categories={categories}
    />
  );
}
