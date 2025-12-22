import type z from "zod";
import type { Catalog, createCatalogSchema } from "@/schemas/catalog";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CatalogType = z.infer<typeof Catalog>;
type Body = z.infer<typeof createCatalogSchema>;

export async function postCatalog(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogType>("/v1/catalogs", {
    method: "POST",
    body,
    headers,
  });
}
