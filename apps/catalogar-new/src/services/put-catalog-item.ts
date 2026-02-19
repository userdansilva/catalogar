import z from "zod";
import { type CatalogItem, catalogItemSchema } from "@/schemas/catalog-item";
import { catalogItemImageSchema } from "@/schemas/catalog-item-image";
import { categorySchema } from "@/schemas/category";
import { productTypeSchema } from "@/schemas/product-type";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const bodySchema = z.object({
  id: catalogItemSchema.shape.id,
  title: catalogItemSchema.shape.title,
  caption: catalogItemSchema.shape.caption,
  productTypeId: productTypeSchema.shape.id,
  images: z.array(
    z.object({
      fileName: catalogItemImageSchema.shape.fileName,
      url: catalogItemImageSchema.shape.url,
      sizeInBytes: catalogItemImageSchema.shape.sizeInBytes,
      width: catalogItemImageSchema.shape.width,
      height: catalogItemImageSchema.shape.height,
      altText: catalogItemImageSchema.shape.altText,
      position: catalogItemImageSchema.shape.position,
    }),
  ),
  price: catalogItemSchema.shape.price,
  categoryIds: z.array(categorySchema.shape.id),
  isDisabled: catalogItemSchema.shape.isDisabled,
});

type Body = z.infer<typeof bodySchema>;

export async function putCatalogItem({ id, ...body }: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogItem>(`/v1/catalog-items/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
