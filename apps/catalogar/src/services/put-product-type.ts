import type z from "zod";
import type {
  ProductType,
  updateProductTypeSchema,
} from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type ProductTypeType = z.infer<typeof ProductType>;
type Body = z.infer<typeof updateProductTypeSchema>;

export async function putProductType({ id, ...body }: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<ProductTypeType>(`/v1/product-types/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
