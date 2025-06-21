import { auth } from "@/auth";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { redirect } from "next/navigation";
import { CatalogItem, CatalogItemFilters } from "@/types/api-types";
import { formatParamsFrom } from "./format-params-from";

export async function getCatalogItems(filters: CatalogItemFilters = {
  perPage: 10_000,
}) {
  const session = await auth();
  if (!session) redirect(routes.auth.sub.login.url);

  const params = formatParamsFrom(filters);

  const res = await fetch(`${process.env.API_URL}/api/v1/catalog-items?${params}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: { tags: [tags.catalogItems.getAll] },
    cache: "force-cache",
  });

  const data = await res.json();

  return data as ApiResponseWithPagination<CatalogItem[]>;
}
