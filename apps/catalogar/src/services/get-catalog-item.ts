import { serverFetch } from "@/utils/server-fetch";
import { CatalogItem } from "@/schemas/catalog-item";
import z from "zod";
import { getAuthHeaders } from "@/utils/get-auth-headers";

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

export async function getCatalogItem(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItemType>(`/v1/catalog-items/${id}`, {
    headers,
  });
}

type CatalogItemType = z.infer<typeof catalogItemSchema>;
