import z from "zod";
import { type ProductType, productTypeSchema } from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const bodySchema = z.object({
  name: productTypeSchema.shape.name,
  slug: productTypeSchema.shape.slug,
  isDisabled: productTypeSchema.shape.isDisabled,
});

type Body = z.infer<typeof bodySchema>;

export async function postProductType(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<ProductType>("/v1/product-types", {
    method: "POST",
    body,
    headers,
  });
}
