import type z from "zod";
import type { Category, updateCategorySchema } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type CategoryType = z.infer<typeof Category>;
type Body = z.infer<typeof updateCategorySchema>;

export async function putCategory({ id, ...body }: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CategoryType>(`/v1/categories/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
