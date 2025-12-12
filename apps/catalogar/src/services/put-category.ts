import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type Category = {
  id: string;
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export async function putCategory(
  id: string,
  body: {
    name: string;
    slug: string;
    textColor: string;
    backgroundColor: string;
    isDisabled: boolean;
  },
) {
  const headers = await getAuthHeaders();

  return await serverFetch<Category>(`/v1/categories/${id}`, {
    method: "PUT",
    body,
    headers,
  });
}
