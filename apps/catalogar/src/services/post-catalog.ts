import type { Catalog, CreateCatalog } from "@/schemas/catalog";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function postCatalog(body: CreateCatalog) {
  const headers = await getAuthHeaders();

  return await serverFetch<Catalog>("/v1/catalogs", {
    method: "POST",
    body,
    headers,
  });
}
