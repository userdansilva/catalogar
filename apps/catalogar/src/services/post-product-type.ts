import type z from "zod";
import type {
  createProductTypeSchema,
  ProductType,
} from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type ProductTypeType = z.infer<typeof ProductType>;
type Body = z.infer<typeof createProductTypeSchema>;

export async function postProductType(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<ProductTypeType>("/v1/product-types", {
    method: "POST",
    body,
    headers,
  });
}
