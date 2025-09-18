import { ProductType } from "./get-product-type-by-id";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PostProductTypeError = DefaultApiError;
export type PostProductTypeResponse = ApiResponse<ProductType>;
export type PostProductTypeBody = {
  name: string;
  slug: string;
  isDisabled: boolean;
};

export async function postProductType(body: PostProductTypeBody) {
  const headers = await getAuthHeaders();

  headers.append("Content-Type", "application/json");

  return await serverFetch<PostProductTypeError, PostProductTypeResponse>({
    url: "/v1/product-types",
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
}
