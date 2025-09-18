import { DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type DeleteCatalogItemError = DefaultApiError;

export async function deleteCatalogItem(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<DeleteCatalogItemError, void>({
    url: `/v1/catalog-items/${id}`,
    method: "DELETE",
    headers,
  });
}
