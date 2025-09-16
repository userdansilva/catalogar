import { Catalog } from "./get-user";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PostCatalogError = DefaultApiError;
export type PostCatalogResponse = ApiResponse<Catalog>;
export type PostCatalogBody = {
  name: string;
};

export async function postCatalog(body: PostCatalogBody) {
  const headers = await getAuthHeaders();

  return await serverFetch<PostCatalogError, PostCatalogResponse>({
    url: "/v1/catalogs",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
