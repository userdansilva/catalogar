import z from "zod";
import { Category } from "@/schemas/category";
import type { Paginated } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const categorySchema = z.object({
  id: Category.shape.id,
  name: Category.shape.name,
  slug: Category.shape.slug,
  textColor: Category.shape.textColor,
  backgroundColor: Category.shape.backgroundColor,
  isDisabled: Category.shape.isDisabled,
  disabledAt: Category.shape.disabledAt,
  createdAt: Category.shape.createdAt,
  updatedAt: Category.shape.updatedAt,
});

type CategoryType = z.infer<typeof categorySchema>;
type QueryParams = {
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
  page?: string;
  perPage?: string;
};

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
