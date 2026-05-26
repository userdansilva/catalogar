import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { getUser } from "@/services/get-user";
import { NavMainClient } from "./client";

export async function NavMain() {
  const user = await getUser();

  const [{ productTypes }, { categories }, { catalogItems }] =
    await Promise.all([getProductTypes(), getCategories(), getCatalogItems()]);

  return (
    <NavMainClient
      user={user}
      productTypes={productTypes}
      categories={categories}
      catalogItems={catalogItems.map((item) => ({
        ...item,
        price: item.price ? Number(item.price) : null,
      }))}
    />
  );
}
