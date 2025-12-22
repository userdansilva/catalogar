import type z from "zod";
import type { ProductType } from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type ProductTypeType = z.infer<typeof ProductType>;

export async function getProductType(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<ProductTypeType>(`/v1/product-types/${id}`, {
    headers,
  });
}
