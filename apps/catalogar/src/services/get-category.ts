import type z from "zod";
import type { Category } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CategoryType = z.infer<typeof Category>;

export async function getCategory(id: CategoryType["id"]) {
  const headers = await getAuthHeaders();

  return await serverFetch<CategoryType>(`/v1/categories/${id}`, {
    headers,
  });
}
