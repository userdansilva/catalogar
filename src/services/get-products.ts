import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { Product, ProductFilters } from "@/types/api-types";

export async function getProducts(filters: ProductFilters = {}) {
  const session = await auth();
  if (!session) redirect(routes.auth.login);

  const params = new URLSearchParams({
    field: filters.field || "createdAt",
    page: (filters.page || "1").toString(),
    perPage: (filters.perPage || "1").toString(),
    sort: filters.sort || "desc",
  });

  const res = await fetch(`${process.env.API_URL}/api/v1/products?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: { tags: [tags.products.getAll] },
  });

  const data = await res.json();

  return data as ApiResponseWithPagination<Product[]>;
}
