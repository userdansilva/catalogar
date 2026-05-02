import { RedirectType, redirect } from "next/navigation";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { getUser } from "@/services/get-user";
import { NavMainClient } from "./client";

export async function NavMain() {
  const user = await getUser();

  return <div>NavMain</div>;

  // const [
  //   [userError, userData],
  //   [productTypesError, productTypesData],
  //   [categoriesError, categoriesData],
  //   [catalogItemsError, catalogItemsData],
  // ] = await Promise.all([
  //   getUser(),
  //   getProductTypes(),
  //   getCategories(),
  //   getCatalogItems(),
  // ]);

  // if (userError) {
  //   return <ExpectedError error={userError} />;
  // }

  // if (!userData.data.currentCatalog) {
  //   return redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  // }

  // if (productTypesError) {
  //   return <ExpectedError error={productTypesError} />;
  // }

  // if (categoriesError) {
  //   return <ExpectedError error={categoriesError} />;
  // }

  // if (catalogItemsError) {
  //   return <ExpectedError error={catalogItemsError} />;
  // }

  // return (
  //   <NavMainClient
  //     user={userData.data}
  //     productTypes={productTypesData.data}
  //     categories={categoriesData.data}
  //     catalogItems={catalogItemsData.data}
  //   />
  // );
}
