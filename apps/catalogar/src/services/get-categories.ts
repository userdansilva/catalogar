import { serverFetch } from "@/utils/server-fetch";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { tags } from "@/tags";
import {
  ApiResponseWithPagination,
  DefaultApiError,
} from "@/types/api-response";

export type Category = {
  id: string;
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};
export type GetCategoriesError = DefaultApiError;
export type GetCategoriesResponse = ApiResponseWithPagination<Category[]>;
export type GetCategoriesParams = {
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
  page?: string;
  perPage?: string;
};

export async function getCategories({
  params,
}: {
  params?: GetCategoriesParams;
} = {}) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCategoriesError, GetCategoriesResponse>({
    url: "/v1/categories",
    params,
    headers,
    next: {
      tags: [tags.categories.getAll],
    },
  });
}
