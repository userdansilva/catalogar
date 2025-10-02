import { serverFetch } from "@catalogar/shared/utils/server-fetch";
import { tag } from "@catalogar/shared/tag";
import { ProductType } from "./get-product-types";
import { Category } from "./get-categories";
import { ApiResponse, DefaultApiError } from "@catalogar/shared/types";

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
  headers,
  tags,
  revalidate,
  params,
}: NextFetchRequestConfig & {
  headers: Headers;
  params?: GetCatalogItemsParams;
}) {
  return await serverFetch<GetCatalogItemsError, GetCatalogItemsResponse>({
    url: "/v1/catalog-items",
    params,
    headers,
    next: {
      tags: [tag.getCatalogItems, ...(tags ?? [])],
      revalidate,
    },
  });
}
