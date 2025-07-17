import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";
import { ProductType } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

export async function getProductTypeById(id: string) {
  const { Authorization } = await getSession();

  const res = await fetch(`${process.env.API_URL}/api/v1/product-types/${id}`, {
    headers: { Authorization },
    next: { tags: [tags.productTypes.getById(id)] },
  });

  const data = await res.json();

  return data as ApiResponse<ProductType>;
}
