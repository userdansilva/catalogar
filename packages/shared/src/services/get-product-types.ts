import { serverFetch } from "@catalogar/shared/server-fetch";
import { tag } from "@catalogar/shared/tags";
import {
  ApiResponseWithPagination,
  DefaultApiError,
} from "@catalogar/shared/types";

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
}: {
  headers: Headers;
  params?: GetProductTypesParams;
  revalidate?: number | false;
  tags?: string[];
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
