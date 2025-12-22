import z from "zod";
import type { Category } from "@/schemas/category";
import type { Paginated } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const querySchema = z.object({
  field: z.enum(["name", "createdAt"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  page: z.string().optional(),
  perPage: z.string().optional(),
});

type CategoryType = z.infer<typeof Category>;
type QueryParams = z.infer<typeof querySchema>;

type GetCategoriesParams = {
  query?: QueryParams;
};

export async function getCategories({ query }: GetCategoriesParams) {
  const headers = await getAuthHeaders();

  return await serverFetch<Paginated<CategoryType[]>>("/v1/categories", {
    query,
    headers,
  });
}
