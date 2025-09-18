import { CatalogItem } from "./get-catalog-item-by-id";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PutCatalogItemError = DefaultApiError;
export type PutCatalogItemResponse = ApiResponse<CatalogItem>;
export type PutCatalogItemBody = {
  title: string;
  caption?: string;
  productTypeId: string;
  images: {
    fileName: string;
    position: number;
    url?: string;
    sizeInBytes?: number;
    width?: number;
    height?: number;
    altText?: string;
  }[];
  price?: string;
  categoryIds?: string[];
  isDisabled: boolean;
};

export async function putCatalogItem(id: string, body: PutCatalogItemBody) {
  const headers = await getAuthHeaders();

  headers.append("Content-Type", "application/json");

  return await serverFetch<PutCatalogItemError, PutCatalogItemResponse>({
    url: `/v1/catalog-items/${id}`,
    method: "PUT",
    body: JSON.stringify(body),
    headers,
  });
}
