import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type PutProductTypeError = DefaultApiError;
export type PutProductTypeResponse = ApiResponse<ProductType>;
export type PutProductTypeBody = {
  name: string;
  slug: string;
  isDisabled: boolean;
};

export async function putProductType(id: string, body: PutProductTypeBody) {
  const headers = await getAuthHeaders();

  return await serverFetch<PutProductTypeError, PutProductTypeResponse>(
    `/v1/product-types/${id}`,
    {
      method: "PUT",
      body,
      headers,
    },
  );
}
