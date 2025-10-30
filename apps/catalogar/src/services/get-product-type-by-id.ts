import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";
import { ApiResponse, DefaultApiError } from "@/types/api-response";

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type GetProductTypeByIdError = DefaultApiError;
export type GetProductTypeByIdResponse = ApiResponse<ProductType>;

export async function getProductTypeById(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetProductTypeByIdError, GetProductTypeByIdResponse>(
    `/v1/product-types/${id}`,
    {
      headers,
    },
  );
}
