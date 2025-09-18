import { CatalogItem } from "./get-catalog-item-by-id";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";
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
  params?: GetCatalogItemsParams;
} = {}) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCatalogItemsError, GetCatalogItemsResponse>({
    url: "/v1/catalog-items",
    params,
    headers,
    next: {
      tags: [tags.catalogItems.getAll],
    },
  });
}
