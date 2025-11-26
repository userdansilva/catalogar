import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";
import {
  ApiResponseWithPagination,
  DefaultApiError,
} from "@/types/api-response";

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
  params,
}: {
  params?: GetProductTypesParams;
} = {}) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetProductTypesError, GetProductTypesResponse>(
    "/v1/product-types",
    {
      query: params,
      headers,
    },
  );
}
