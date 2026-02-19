import z from "zod";
import { type Category, categorySchema } from "@/schemas/category";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const bodySchema = z.object({
  id: categorySchema.shape.id,
  name: categorySchema.shape.name,
  slug: categorySchema.shape.slug,
  textColor: categorySchema.shape.textColor,
  backgroundColor: categorySchema.shape.backgroundColor,
  isDisabled: categorySchema.shape.isDisabled,
});

type Body = z.infer<typeof bodySchema>;

export async function putCategory({ id, ...body }: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<Category>(`/v1/categories/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
