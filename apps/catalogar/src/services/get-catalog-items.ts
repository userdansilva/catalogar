import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";
import z from "zod";
import { CatalogItem } from "@/schemas/catalog-item";

const catalogItemSchema = z.object({
  id: CatalogItem.shape.id,
  title: CatalogItem.shape.title,
  caption: CatalogItem.shape.caption,
  price: CatalogItem.shape.price,
  reference: CatalogItem.shape.reference,
  productType: CatalogItem.shape.productType,
  categories: CatalogItem.shape.categories,
  images: CatalogItem.shape.images,
  isDisabled: CatalogItem.shape.isDisabled,
  disabledAt: CatalogItem.shape.disabledAt,
  createdAt: CatalogItem.shape.createdAt,
  updatedAt: CatalogItem.shape.updatedAt,
});

const querySchema = z.object({
  field: z.enum(["name", "createdAt"]).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});

type CatalogItemType = z.infer<typeof catalogItemSchema>;
type QueryParams = z.infer<typeof querySchema>;

type GetCatalogItemsParams = {
  query?: QueryParams;
};

export async function getCatalogItems({ query }: GetCatalogItemsParams) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItemType[]>("/v1/catalog-items", {
    query,
    headers,
  });
}
