import { formatParamsFrom } from "./format-params-from";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { Category, CategoryFilters } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

export async function getCategories(filters: CategoryFilters = {}) {
  const { Authorization } = await getSession();

  const params = formatParamsFrom(filters);

  const res = await fetch(
    `${process.env.API_URL}/api/v1/categories?${params}`,
    {
      headers: { Authorization },
      next: { tags: [tags.categories.getAll] },
    },
  );

  const data = await res.json();

  return data as ApiResponseWithPagination<Category[]>;
}
