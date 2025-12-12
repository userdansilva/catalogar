import { Paginated } from "@/types/api-response";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  isDisabled: boolean;
  disabledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export async function getProductTypes({
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

  return await serverFetch<Paginated<ProductType[]>>("/v1/product-types", {
    query,
    headers,
  });
}
