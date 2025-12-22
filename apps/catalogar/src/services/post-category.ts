import type z from "zod";
import type { Category, createCategorySchema } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CategoryType = z.infer<typeof Category>;
type Body = z.infer<typeof createCategorySchema>;

export async function postCategory(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CategoryType>("/v1/categories", {
    method: "POST",
    body,
    headers,
  });
}
