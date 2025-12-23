import type { CreateCatalog } from "@/schemas/catalog";
import type { Category } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function postCategory(body: CreateCatalog) {
  const headers = await getAuthHeaders();

  return await serverFetch<Category>("/v1/categories", {
    method: "POST",
    body,
    headers,
  });
}
