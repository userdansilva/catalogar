import { ProductType } from "./get-product-type-by-id";
import { Category } from "./get-category-by-id";
import { CatalogItemImage } from "./get-images-generate-sas-token";
import { serverFetch } from "@/utils/server-fetch";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { tags } from "@/tags";
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

export type GetCatalogItemByIdError = DefaultApiError;
export type GetCatalogItemByIdResponse = ApiResponse<CatalogItem>;

export async function getCatalogItemById(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<GetCatalogItemByIdError, GetCatalogItemByIdResponse>(
    {
      baseUrl: process.env.API_URL as string,
      url: `/v1/catalog-items/${id}`,
      headers,
      next: {
        tags: [tags.catalogItems.getById(id), tags.catalogItems.getByIdAny],
      },
    },
  );
}
