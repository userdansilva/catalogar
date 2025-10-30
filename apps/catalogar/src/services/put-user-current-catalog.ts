import { DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PutUserCurrentCatalogError = DefaultApiError;

export async function putUserCurrentCatalog(catalogId: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<PutUserCurrentCatalogError, void>(
    `/v1/users/me/current-catalog/${catalogId}`,
    {
      method: "PUT",
      headers,
    },
  );
}
