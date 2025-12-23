import type z from "zod";
import type { Category } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CategoryType = z.infer<typeof Category>;

export async function deleteCategory(id: CategoryType["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch<void>(`/v1/categories/${id}`, {
    method: "DELETE",
    headers,
  });
}
