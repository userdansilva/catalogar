import { redirect, RedirectType } from "next/navigation";
import { NavMainClient } from "./client";
import { DefaultApiError } from "@catalogar/shared/default-api-error";
import { getProductTypes } from "@catalogar/shared/get-product-types";
import { getUser } from "@catalogar/shared/get-user";
import { getCategories } from "@catalogar/shared/get-categories";
import { getCatalogItems } from "@catalogar/shared/get-catalog-items";
import { route } from "../../../routes";
import { getAuthHeaders } from "@catalogar/shared/get-auth-headers";

export async function NavMain() {
  const headers = await getAuthHeaders();

  const [
    [userError, userData],
    [productTypesError, productTypesData],
    [categoriesError, categoriesData],
    [catalogItemsError, catalogItemsData],
  ] = await Promise.all([
    getUser({ headers }),
    getProductTypes({ headers }),
    getCategories({ headers }),
    getCatalogItems({ headers }),
  ]);

  if (userError) {
    return <DefaultApiError error={userError} />;
  }

  if (!userData.data.currentCatalog) {
    return redirect(route.catalog.sub.createFirst.url, RedirectType.replace);
  }

  if (productTypesError) {
    return <DefaultApiError error={productTypesError} />;
  }

  if (categoriesError) {
    return <DefaultApiError error={categoriesError} />;
  }

  if (catalogItemsError) {
    return <DefaultApiError error={catalogItemsError} />;
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
