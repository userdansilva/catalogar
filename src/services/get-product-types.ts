import { redirect } from "next/navigation";
import { formatParamsFrom } from "./format-params-from";
import { auth } from "@/auth";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { ProductType, ProductTypeFilters } from "@/types/api-types";

export async function getProductTypes(filters: ProductTypeFilters = {}) {
  const session = await auth();
  if (!session) redirect(routes.auth.sub.login.url);

  const params = formatParamsFrom(filters);

  const res = await fetch(
    `${process.env.API_URL}/api/v1/product-types?${params}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: [tags.productTypes.getAll] },
    },
  );

  const data = await res.json();

  return data as ApiResponseWithPagination<ProductType[]>;
}
