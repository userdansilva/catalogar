import type z from "zod";
import type { Catalog } from "@/schemas/catalog";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CatalogType = z.infer<typeof Catalog>;

export async function putUserCurrentCatalog(id: CatalogType["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch<void>(`/v1/users/me/current-catalog/${id}`, {
    method: "PUT",
    headers,
  });
}
