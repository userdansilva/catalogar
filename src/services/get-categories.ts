import { auth } from "@/auth";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { Category, CategoryFilters } from "@/types/api-types";
import { redirect } from "next/navigation";

export async function getCategories(filters: CategoryFilters = {}) {
  const session = await auth()
  if (!session) redirect(routes.auth.login)

  const params = new URLSearchParams({
    field: filters.field || "createdAt",
    page: (filters.page || "1").toString(),
    perPage: (filters.perPage || "1").toString(),
    sort: filters.sort || "desc"
  })

  const res = await fetch(`${process.env.API_URL}/api/v1/categories?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`
    },
    next: { tags: [tags.categories.findAll] }
  })

  const data = await res.json()

  return data as ApiResponseWithPagination<Category[]>
}
