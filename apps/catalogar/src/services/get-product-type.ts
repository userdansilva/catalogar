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

export type GetProductTypeError = DefaultApiError;
export type GetProductTypeResponse = ApiResponse<ProductType>;

export async function getProductType(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetProductTypeError, GetProductTypeResponse>(
    `/v1/product-types/${id}`,
    {
      headers,
    },
  );
}
