import { auth } from "@/auth";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { Category, CategoryFilters } from "@/types/api-types";
import { redirect } from "next/navigation";
import { formatParamsFrom } from "./format-params-from";

export async function getCategories(filters: CategoryFilters = {}) {
  const session = await auth();
  if (!session) redirect(routes.auth.sub.login.url);

  const params = formatParamsFrom(filters);

  const res = await fetch(
    `${process.env.API_URL}/api/v1/categories?${params}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: [tags.categories.getAll] },
    },
  );

  const data = await res.json();

  return data as ApiResponseWithPagination<Category[]>;
}
