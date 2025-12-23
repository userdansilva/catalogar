import type { CatalogItem, UpdateCatalogItem } from "@/schemas/catalog-item";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function putCatalogItem({ id, ...body }: UpdateCatalogItem) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItem>(`/v1/catalog-items/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
