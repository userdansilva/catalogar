import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";
import { Category } from "@/types/api-types";
import { getSession } from "@/utils/get-session";

export async function getCategoryById(id: string) {
  const { Authorization } = await getSession();

  const res = await fetch(`${process.env.API_URL}/api/v1/categories/${id}`, {
    headers: { Authorization },
    next: { tags: [tags.categories.getById(id)] },
  });

  const data = await res.json();

  return data as ApiResponse<Category>;
}
