import { Catalog } from "./get-user";
import { Category } from "./get-category-by-id";
import { ProductType } from "./get-product-type-by-id";
import { CatalogItem } from "./get-catalog-item-by-id";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";
import { ApiResponse, DefaultApiError } from "@/types/api-response";
import { tags } from "@/tags";

export type PublishedCatalog = Required<Catalog> & {
  categories: Category[];
  productTypes: ProductType[];
  catalogItems: CatalogItem[];
};

export type GetPublicCatalogBySlugError = DefaultApiError;
export type GetPublicCatalogBySlugResponse = ApiResponse<PublishedCatalog>;

export async function getPublicCatalogBySlug(slug: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<
    GetPublicCatalogBySlugError,
    GetPublicCatalogBySlugResponse
  >({
    url: `/v1/public/catalogs/${slug}`,
    headers,
    next: {
      tags: [tags.publicCatalog.getBySlug(slug)],
    },
    cache: "force-cache",
  });
}
