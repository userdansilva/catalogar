import { formatParamsFrom } from "./format-params-from";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { CatalogItem, CatalogItemFilters } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

export async function getCatalogItems(
  filters: CatalogItemFilters = {
    perPage: 10_000,
  },
) {
  const { Authorization } = await getSession();

  const params = formatParamsFrom(filters);

  const res = await fetch(
    `${process.env.API_URL}/api/v1/catalog-items?${params}`,
    {
      headers: { Authorization },
      next: { tags: [tags.catalogItems.getAll] },
    },
  );

  const data = await res.json();

  return data as ApiResponseWithPagination<CatalogItem[]>;
}
