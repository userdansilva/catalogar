import type { ProductType, UpdateProductType } from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function putProductType({ id, ...body }: UpdateProductType) {
  const headers = await getAuthHeaders();

  return await serverFetch<ProductType>(`/v1/product-types/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
