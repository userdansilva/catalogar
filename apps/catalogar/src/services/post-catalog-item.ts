import type { CatalogItem, CreateCatalogItem } from "@/schemas/catalog-item";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function postCatalogItem(body: CreateCatalogItem) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItem>("/v1/catalog-items", {
    method: "POST",
    body,
    headers,
  });
}
