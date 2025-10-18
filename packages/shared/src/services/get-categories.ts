import { tag } from "@catalogar/shared/tags";
import {
  ApiResponseWithPagination,
  DefaultApiError,
} from "@catalogar/shared/types";
import { serverFetch } from "@catalogar/shared/server-fetch";

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
}: {
  headers: Headers;
  params?: GetCategoriesParams;
  revalidate?: number | false;
  tags?: string[];
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
