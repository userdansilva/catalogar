import type { Catalog, PublishCatalog, UpdateCatalog } from "@/schemas/catalog";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function putCatalog(body: UpdateCatalog | PublishCatalog) {
  const headers = await getAuthHeaders();

  return await serverFetch<Catalog>("/v1/catalogs", {
    method: "PUT",
    body,
    headers,
  });
}
