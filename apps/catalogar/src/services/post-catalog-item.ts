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
