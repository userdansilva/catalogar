import type { CatalogItem } from "@/schemas/catalog-item";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function deleteCatalogItem(id: CatalogItem["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch(`/v1/catalog-items/${id}`, {
    method: "DELETE",
    headers,
  });
}
