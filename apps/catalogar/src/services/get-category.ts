import z from "zod";
import { Category } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const categorySchema = z.object({
  id: Category.shape.id,
  name: Category.shape.name,
  slug: Category.shape.slug,
  textColor: Category.shape.textColor,
  backgroundColor: Category.shape.backgroundColor,
  isDisabled: Category.shape.isDisabled,
  disabledAt: Category.shape.disabledAt,
  createdAt: Category.shape.createdAt,
  updatedAt: Category.shape.updatedAt,
});

type CategoryType = z.infer<typeof categorySchema>;

export async function getCategory(id: string) {
  const headers = await getAuthHeaders();

  return await serverFetch<CategoryType>(`/v1/categories/${id}`, {
    headers,
  });
}
