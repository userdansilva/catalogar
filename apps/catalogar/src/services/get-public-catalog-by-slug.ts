import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";
import { PublishedCatalog } from "@/types/api-types";

export async function getPublicCatalogBySlug(slug: string) {
  const res = await fetch(
    `${process.env.API_URL}/api/v1/public/catalogs/${slug}`,
    {
      next: { tags: [tags.publicCatalog.getBySlug(slug)] },
      cache: "force-cache",
    },
  );

  const data = await res.json();

  return data as ApiResponse<PublishedCatalog>;
}
