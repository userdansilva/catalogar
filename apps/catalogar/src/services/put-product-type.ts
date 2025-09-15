import { ProductType } from "./get-product-type-by-id";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PutProductTypeError = DefaultApiError;
export type PutProductTypeResponse = ApiResponse<ProductType>;
export type PutProductTypeBody = {
  name: string;
  slug: string;
  isDisabled: boolean;
};

export async function putProductType(id: string, body: PutProductTypeBody) {
  const headers = await getAuthHeaders();

  return await serverFetch<PutProductTypeError, PutProductTypeResponse>({
    url: `/v1/product-types/${id}`,
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
