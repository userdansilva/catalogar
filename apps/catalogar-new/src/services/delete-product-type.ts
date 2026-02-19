import type { ProductType } from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function deleteProductType(id: ProductType["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch(`/v1/product-types/${id}`, {
    method: "DELETE",
    headers,
  });
}
