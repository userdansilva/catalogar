import z from "zod";
import { Catalog } from "@/schemas/catalog";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const catalogSchema = z.object({
  id: Catalog.shape.id,
  name: Catalog.shape.name,
  slug: Catalog.shape.slug,
  publishedAt: Catalog.shape.publishedAt,
  isPublished: Catalog.shape.isPublished,
  company: Catalog.shape.company,
  theme: Catalog.shape.theme,
  createdAt: Catalog.shape.createdAt,
  updatedAt: Catalog.shape.updatedAt,
});

const bodySchema = z.object({
  name: Catalog.shape.name,
});

type CatalogType = z.infer<typeof catalogSchema>;
type Body = z.infer<typeof bodySchema>;

export async function postCatalog(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogType>("/v1/catalogs", {
    method: "POST",
    body,
    headers,
  });
}
