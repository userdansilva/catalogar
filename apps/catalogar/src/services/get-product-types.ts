import z from "zod";
import { ProductType } from "@/schemas/product-type";
import type { Paginated } from "@/types/api-response";
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
type QueryParams = {
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
  page?: string;
  perPage?: string;
};

type GetProductTypesParams = {
  query?: QueryParams;
};

export async function getProductTypes({ query }: GetProductTypesParams) {
  const headers = await getAuthHeaders();

  return await serverFetch<Paginated<ProductTypeType[]>>("/v1/product-types", {
    query,
    headers,
  });
}
