import { DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type DeleteProductTypeError = DefaultApiError;

export async function deleteProductType(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<DeleteProductTypeError, void>({
    url: `/v1/product-types/${id}`,
    method: "DELETE",
    headers,
  });
}
