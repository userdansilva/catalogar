import type { Category } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function getCategory(id: Category["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch<Category>(`/v1/categories/${id}`, {
    headers,
  });
}
