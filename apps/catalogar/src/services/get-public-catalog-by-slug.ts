import z from "zod";
import { Catalog } from "@/schemas/catalog";
import { CatalogItem } from "@/schemas/catalog-item";
import { Category } from "@/schemas/category";
import { ProductType } from "@/schemas/product-type";
import { tags } from "@/tags";
import { serverFetch } from "@/utils/server-fetch";

const publishedCatalogSchema = Catalog.required().extend({
  categories: z.array(Category),
  productTypes: z.array(ProductType),
  catalogItems: z.array(CatalogItem),
});

type PublishedCatalogType = z.infer<typeof publishedCatalogSchema>;

export async function getPublicCatalogBySlug(
  slug: PublishedCatalogType["slug"],
) {
  return await serverFetch<PublishedCatalogType>(
    `/v1/public/catalogs/${slug}`,
    {
      next: {
        tags: [tags.publicCatalog.getBySlug(slug)],
      },
      cache: "force-cache",
    },
  );
}
