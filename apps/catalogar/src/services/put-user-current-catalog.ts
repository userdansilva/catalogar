import type { Catalog } from "@/schemas/catalog";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function putUserCurrentCatalog(id: Catalog["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch(`/v1/users/me/current-catalog/${id}`, {
    method: "PUT",
    headers,
  });
}
