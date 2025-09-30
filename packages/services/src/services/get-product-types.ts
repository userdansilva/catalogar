import { serverFetch } from "@/utils/server-fetch";
import {
  ApiResponseWithPagination,
  DefaultApiError,
} from "@/types/api-response";
import { tag } from "@/tag";

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};
export type GetProductTypesError = DefaultApiError;
export type GetProductTypesResponse = ApiResponseWithPagination<ProductType[]>;
export type GetProductTypesParams = {
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
  page?: string;
  perPage?: string;
};

export async function getProductTypes({
  headers,
  tags,
  revalidate,
  params,
}: NextFetchRequestConfig & {
  headers: Headers;
  params?: GetProductTypesParams;
}) {
  return await serverFetch<GetProductTypesError, GetProductTypesResponse>({
    url: "/v1/product-types",
    params,
    headers,
    next: {
      tags: [tag.getProductTypes, ...(tags ?? [])],
      revalidate,
    },
  });
}
