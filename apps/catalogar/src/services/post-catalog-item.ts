import { CatalogItem } from "./get-catalog-item-by-id";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type PostCatalogItemError = DefaultApiError;
export type PostCatalogItemResponse = ApiResponse<CatalogItem>;
export type PostCatalogItemBody = {
  title: string;
  caption?: string;
  productTypeId: string;
  images: {
    fileName: string;
    url: string;
    sizeInBytes: number;
    width: number;
    height: number;
    altText: string;
    position: number;
  }[];
  price?: string;
  categoryIds?: string[];
  isDisabled: boolean;
};

export async function postCatalogItem(body: PostCatalogItemBody) {
  const headers = await getAuthHeaders();

  return await serverFetch<PostCatalogItemError, PostCatalogItemResponse>(
    "/v1/catalog-items",
    {
      method: "POST",
      body,
      headers,
    },
  );
}
