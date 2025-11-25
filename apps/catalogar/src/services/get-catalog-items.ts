import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";
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

  return await serverFetch<GetCatalogItemsError, GetCatalogItemsResponse>(
    "/v1/catalog-items",
    {
      query: params,
      headers,
    },
  );
}
