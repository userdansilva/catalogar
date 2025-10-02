import { DefaultApiError } from "@catalogar/shared/types";
import { serverFetch } from "@catalogar/shared/utils/server-fetch";

export type PutUserCurrentCatalogError = DefaultApiError;

export async function putUserCurrentCatalog(
  catalogId: string,
  {
    headers,
  }: NextFetchRequestConfig & {
    headers: Headers;
  }
) {
  headers.append("Content-Type", "application/json");

  return await serverFetch<PutUserCurrentCatalogError, void>({
    url: `/v1/users/me/current-catalog/${catalogId}`,
    method: "PUT",
    headers,
  });
}
