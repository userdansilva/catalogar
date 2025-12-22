import z from "zod";
import type { ProductType } from "@/schemas/product-type";
import type { Paginated } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const querySchema = z.object({
  field: z.enum(["name", "createdAt"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  page: z.string().optional(),
  perPage: z.string().optional(),
});

type ProductTypeType = z.infer<typeof ProductType>;
type QueryParams = z.infer<typeof querySchema>;

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
