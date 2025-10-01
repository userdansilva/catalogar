import { DefaultApiError } from "@/types";
import { serverFetch } from "@/utils/server-fetch";

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
