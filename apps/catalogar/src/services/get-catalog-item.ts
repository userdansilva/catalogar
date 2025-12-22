import z from "zod";
import { CatalogItem } from "@/schemas/catalog-item";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

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

type CatalogItemType = z.infer<typeof catalogItemSchema>;

export async function getCatalogItem(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItemType>(`/v1/catalog-items/${id}`, {
    headers,
  });
}
