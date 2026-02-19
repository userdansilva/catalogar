import z from "zod";
import { catalogSchema } from "@/schemas/catalog";
import { catalogItemSchema } from "@/schemas/catalog-item";
import { categorySchema } from "@/schemas/category";
import { productTypeSchema } from "@/schemas/product-type";
import { tags } from "@/tags";
import { serverFetch } from "@/utils/server-fetch";

const publishedCatalogSchema = catalogSchema.required().extend({
  categories: z.array(categorySchema),
  productTypes: z.array(productTypeSchema),
  catalogItems: z.array(catalogItemSchema),
});

type PublishedCatalog = z.infer<typeof publishedCatalogSchema>;

export async function getPublicCatalogBySlug(slug: PublishedCatalog["slug"]) {
  return await serverFetch<PublishedCatalog>(`/v1/public/catalogs/${slug}`, {
    next: {
      tags: [tags.publicCatalog.getBySlug(slug)],
    },
    cache: "force-cache",
  });
}
