import { serverFetch } from "@/utils/server-fetch";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { ApiResponse, DefaultApiError } from "@/types/api-response";

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

export type GetCatalogItemError = DefaultApiError;
export type GetCatalogItemResponse = ApiResponse<CatalogItem>;

export async function getCatalogItem(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCatalogItemError, GetCatalogItemResponse>(
    `/v1/catalog-items/${id}`,
    {
      headers,
    },
  );
}
