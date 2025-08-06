import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";
import { CatalogItem } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

export async function getCatalogItemById(id: string) {
  const { Authorization } = await getSession();

  const res = await fetch(`${process.env.API_URL}/api/v1/catalog-items/${id}`, {
    headers: { Authorization },
    next: {
      tags: [tags.catalogItems.getById(id), tags.catalogItems.getByIdAny],
    },
  });

  const data = await res.json();

  return data as ApiResponse<CatalogItem>;
}
