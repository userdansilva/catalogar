import { tag } from "@/tag";
import { ApiResponseWithPagination, DefaultApiError } from "@/types";
import { serverFetch } from "@/utils/server-fetch";

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
  headers,
  tags,
  revalidate,
  params,
}: NextFetchRequestConfig & {
  headers: Headers;
  params?: GetCategoriesParams;
}) {
  return await serverFetch<GetCategoriesError, GetCategoriesResponse>({
    url: "/v1/categories",
    params,
    headers,
    next: {
      tags: [tag.getCategories, ...(tags ?? [])],
      revalidate,
    },
  });
}
