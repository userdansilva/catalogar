import type z from "zod";
import type { CatalogItem } from "@/schemas/catalog-item";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CatalogItemType = z.infer<typeof CatalogItem>;

export async function getCatalogItem(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItemType>(`/v1/catalog-items/${id}`, {
    headers,
  });
}
