import { Category } from "./get-category-by-id";
import { serverFetch } from "@/utils/server-fetch";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { tags } from "@/tags";
import {
  ApiResponseWithPagination,
  DefaultApiError,
} from "@/types/api-response";

export type GetCategoriesError = DefaultApiError;
export type GetCategoriesResponse = ApiResponseWithPagination<Category[]>;
export type GetCategoriesParams = {
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
  page?: number;
  perPage?: number;
};

export async function getCategories({
  params,
}: {
  params?: GetCategoriesParams;
} = {}) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCategoriesError, GetCategoriesResponse>({
    baseUrl: process.env.API_URL as string,
    url: "/v1/categories",
    params,
    headers,
    next: {
      tags: [tags.categories.getAll],
    },
  });
}
