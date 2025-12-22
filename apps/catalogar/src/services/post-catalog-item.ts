import type z from "zod";
import type {
  CatalogItem,
  createCatalogItemSchema,
} from "@/schemas/catalog-item";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CatalogItemType = z.infer<typeof CatalogItem>;
type Body = z.infer<typeof createCatalogItemSchema>;

export async function postCatalogItem(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItemType>("/v1/catalog-items", {
    method: "POST",
    body,
    headers,
  });
}
