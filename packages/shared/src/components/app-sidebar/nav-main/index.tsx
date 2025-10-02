import { redirect, RedirectType } from "next/navigation";
import { NavMainClient } from "./client";
import { DefaultApiError } from "@catalogar/shared/components/error-handling/default-api-error";
import { getProductTypes } from "@catalogar/shared/services/get-product-types";
import { getUser } from "@catalogar/shared/services/get-user";
import { getCategories } from "@catalogar/shared/services/get-categories";
import { getCatalogItems } from "@catalogar/shared/services/get-catalog-items";
import { route } from "@catalogar/shared/route";
import { getAuthHeaders } from "@catalogar/shared/utils/get-auth-headers";

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
