import { CatalogItem } from "./get-catalog-item-by-id";
import { getAuthHeaders } from "./get-auth-headers";
import { serverFetch } from "./server-fetch";
import { tags } from "@/tags";
import { ApiResponse, DefaultApiError } from "@/types/api-response";

export type GetCatalogItemsError = DefaultApiError;
export type GetCatalogItemsResponse = ApiResponse<CatalogItem[]>;
export type GetCatalogItemsParams = {
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
};

export async function getCatalogItems({
  params,
}: {
  params: GetCatalogItemsParams;
}) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCatalogItemsError, GetCatalogItemsResponse>({
    baseUrl: process.env.API_URL as string,
    url: "/v1/catalog-items",
    params,
    headers,
    next: {
      tags: [tags.catalogItems.getAll],
    },
  });
}
