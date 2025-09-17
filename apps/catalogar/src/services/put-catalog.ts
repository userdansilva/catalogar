import { Catalog } from "./get-user";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PutCatalogError = DefaultApiError;
export type PutCatalogResponse = ApiResponse<Catalog>;
export type PutCatalogBody = {
  name: string;
  slug?: string;
  isPublished?: boolean;
};

export async function putCatalog(body: PutCatalogBody) {
  const headers = await getAuthHeaders();

  headers.append("Content-Type", "application/json");

  return await serverFetch<PutCatalogError, PutCatalogResponse>({
    url: "/v1/catalogs",
    method: "PUT",
    body: JSON.stringify(body),
    headers,
  });
}
