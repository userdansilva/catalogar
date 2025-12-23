import type z from "zod";
import type { ProductType } from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type ProductTypeType = z.infer<typeof ProductType>;

export async function deleteProductType(id: ProductTypeType["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch<void>(`/v1/product-types/${id}`, {
    method: "DELETE",
    headers,
  });
}
