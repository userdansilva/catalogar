import z from "zod";
import type { CatalogItem } from "@/schemas/catalog-item";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const querySchema = z.object({
  field: z.enum(["name", "createdAt"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});

type CatalogItemType = z.infer<typeof CatalogItem>;
type QueryParams = z.infer<typeof querySchema>;

type GetCatalogItemsParams = {
  query?: QueryParams;
};

export async function getCatalogItems({ query }: GetCatalogItemsParams) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItemType[]>("/v1/catalog-items", {
    query,
    headers,
  });
}
