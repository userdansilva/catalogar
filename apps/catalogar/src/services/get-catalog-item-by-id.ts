import { ProductType } from "./get-product-type-by-id";
import { Category } from "./get-category-by-id";
import { serverFetch } from "@/utils/server-fetch";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { ApiResponse, DefaultApiError } from "@/types/api-response";

export type CatalogItem = {
  id: string;
  title: string;
  caption?: string;
  price?: number;
  reference: number;
  productType: ProductType;
  categories: Category[];
  images: CatalogItemImage[];
  isDisabled: boolean;
  disabled?: string;
  createdAt: string;
  updatedAt: string;
};

export type CatalogItemImage = {
  id: string;
  fileName: string;
  url: string;
  sizeInBytes: number;
  width: number;
  height: number;
  altText?: string;
  position: number;
  createdAt: string;
};

export type GetCatalogItemByIdError = DefaultApiError;
export type GetCatalogItemByIdResponse = ApiResponse<CatalogItem>;

export async function getCatalogItemById(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCatalogItemByIdError, GetCatalogItemByIdResponse>(
    `/v1/catalog-items/${id}`,
    {
      headers,
    },
  );
}
