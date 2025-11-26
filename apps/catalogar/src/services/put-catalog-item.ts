import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
  isDisabled: boolean;
  disabledAt?: string;
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

  return await serverFetch<PutCatalogItemError, PutCatalogItemResponse>(
    `/v1/catalog-items/${id}`,
    {
      method: "PUT",
      body,
      headers,
    },
  );
}
