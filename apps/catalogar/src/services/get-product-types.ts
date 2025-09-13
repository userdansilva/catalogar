import { getAuthHeaders } from "./get-auth-headers";
import { ProductType } from "./get-product-type-by-id";
import { serverFetch } from "./server-fetch";
import { tags } from "@/tags";
import {
  ApiResponseWithPagination,
  DefaultApiError,
} from "@/types/api-response";

export type GetProductTypesError = DefaultApiError;
export type GetProductTypesResponse = ApiResponseWithPagination<ProductType[]>;
export type GetProductTypesParams = {
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
};

export async function getProductTypes({
  params,
}: {
  params: GetProductTypesParams;
}) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetProductTypesError, GetProductTypesResponse>({
    baseUrl: process.env.API_URL as string,
    url: "/v1/product-types",
    params,
    headers,
    next: {
      tags: [tags.productTypes.getAll],
    },
  });
}
