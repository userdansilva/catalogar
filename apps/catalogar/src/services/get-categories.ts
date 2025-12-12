import { serverFetch } from "@/utils/server-fetch";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { Paginated } from "@/types/api-response";

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

export async function getCategories({
  query,
}: {
  query?: {
    field?: "name" | "createdAt";
    sort?: "asc" | "desc";
    page?: string;
    perPage?: string;
  };
} = {}) {
  const headers = await getAuthHeaders();

  return await serverFetch<Paginated<Category[]>>("/v1/categories", {
    query,
    headers,
  });
}
