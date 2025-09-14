import { redirect, RedirectType } from "next/navigation";
import { NavMainClient } from "./client";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { routes } from "@/routes";
import { getProductTypes } from "@/services/get-product-types";
import { getUser } from "@/services/get-user";
import { getCategories } from "@/services/get-categories";
import { getCatalogItems } from "@/services/get-catalog-items";

export async function NavMain() {
  const [
    [userError, userData],
    [productTypesError, productTypesData],
    [categoriesError, categoriesData],
    [catalogItemsError, catalogItemsData],
  ] = await Promise.all([
    getUser(),
    getProductTypes(),
    getCategories(),
    getCatalogItems(),
  ]);

  if (userError) {
    return <ExpectedError error={userError} />;
  }

  if (!userData.data.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  if (productTypesError) {
    return <ExpectedError error={productTypesError} />;
  }

  if (categoriesError) {
    return <ExpectedError error={categoriesError} />;
  }

  if (catalogItemsError) {
    return <ExpectedError error={catalogItemsError} />;
  }

  return (
    <NavMainClient
      user={userData.data}
      productTypes={productTypesData.data}
      categories={categoriesData.data}
      catalogItems={catalogItemsData.data}
    />
  );
}
