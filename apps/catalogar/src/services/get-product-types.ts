import { formatParamsFrom } from "./format-params-from";
import { tags } from "@/tags";
import { ApiResponseWithPagination } from "@/types/api-response";
import { ProductType, ProductTypeFilters } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

export async function getProductTypes(filters: ProductTypeFilters = {}) {
  const { Authorization } = await getSession();

  const params = formatParamsFrom(filters);

  const res = await fetch(
    `${process.env.API_URL}/api/v1/product-types?${params}`,
    {
    headers: { Authorization },
      next: { tags: [tags.productTypes.getAll] },
    },
  );

  const data = await res.json();

  return data as ApiResponseWithPagination<ProductType[]>;
}
