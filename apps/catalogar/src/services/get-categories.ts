import { serverFetch } from "./server-fetch";
import { getAuthHeaders } from "./get-auth-headers";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { DefaultApiError } from "@/types/default-api-error";

export type GetCategoriesError = DefaultApiError;
export type GetCategoriesResponse = ApiResponseWithPagination<
  {
    id: string;
    name: string;
    slug: string;
    textColor: string;
    backgroundColor: string;
    isDisabled: boolean;
    disabledAt?: string;
    createdAt: string;
    updatedAt: string;
  }[]
>;
export type GetCategoriesParams = {
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
  page?: number;
  perPage?: number;
};

export async function getCategories(params: GetCategoriesParams = {}) {
  const headers = await getAuthHeaders();

  const result = await serverFetch<GetCategoriesError, GetCategoriesResponse>({
    baseUrl: process.env.API_URL as string,
    url: "/api/v1/categories",
    params,
    headers,
    next: {
      tags: [tags.createCategory, tags.updateCategory, tags.deleteCategory],
    },
  });

  return result;
}
