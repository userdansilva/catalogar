import z from "zod";
import { ProductType } from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const productTypeSchema = z.object({
  id: ProductType.shape.id,
  name: ProductType.shape.name,
  slug: ProductType.shape.slug,
  isDisabled: ProductType.shape.isDisabled,
  disabledAt: ProductType.shape.disabledAt,
  createdAt: ProductType.shape.createdAt,
  updatedAt: ProductType.shape.updatedAt,
});

type ProductTypeType = z.infer<typeof productTypeSchema>;

export async function getProductType(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<ProductTypeType>(`/v1/product-types/${id}`, {
    headers,
  });
}
