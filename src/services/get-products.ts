import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { Product, ProductFilters } from "@/types/api-types";
import { formatParamsFrom } from "./format-params-from";

export async function getProducts(filters: ProductFilters = {}) {
  const session = await auth();
  if (!session) redirect(routes.auth.sub.login.url);

  const params = formatParamsFrom(filters);

  const res = await fetch(`${process.env.API_URL}/api/v1/products?${params}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: { tags: [tags.products.getAll] },
  });

  const data = await res.json();

  return data as ApiResponseWithPagination<Product[]>;
}
