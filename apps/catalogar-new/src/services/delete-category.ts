import type { Category } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function deleteCategory(id: Category["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch(`/v1/categories/${id}`, {
    method: "DELETE",
    headers,
  });
}
