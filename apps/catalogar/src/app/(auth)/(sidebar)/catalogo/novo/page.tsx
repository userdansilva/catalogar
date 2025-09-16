import { Metadata } from "next";
import { routes } from "@/routes";
import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { getProductTypes } from "@/services/get-product-types";
import { getCategories } from "@/services/get-categories";
import { ExpectedError } from "@/components/error-handling/expected-error";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.new.title,
};

export default async function NewCatalogItem({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const [
    [productTypesError, productTypesData],
    [categoriesError, categoriesData],
  ] = await Promise.all([getProductTypes(), getCategories()]);

  if (productTypesError) {
    return <ExpectedError error={productTypesError} />;
  }

  if (categoriesError) {
    return <ExpectedError error={categoriesError} />;
  }

  const productTypes = productTypesData.data;
  const categories = categoriesData.data;

  return (
    <CreateCatalogItemForm
      productTypes={productTypes}
      categories={categories}
      callbackUrl={callbackUrl}
    />
  );
}
