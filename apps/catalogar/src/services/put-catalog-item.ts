import type z from "zod";
import type {
  CatalogItem,
  updateCatalogItemSchema,
} from "@/schemas/catalog-item";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CatalogItemType = z.infer<typeof CatalogItem>;
type Body = z.infer<typeof updateCatalogItemSchema>;

export async function putCatalogItem({ id, ...body }: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItemType>(`/v1/catalog-items/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
