import type { CreateProductType, ProductType } from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function postProductType(body: CreateProductType) {
  const headers = await getAuthHeaders();

  return await serverFetch<ProductType>("/v1/product-types", {
    method: "POST",
    body,
    headers,
  });
}
