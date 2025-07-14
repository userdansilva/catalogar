import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";
import { CatalogItem } from "@/types/api-types";

export async function getCatalogItemById(id: string) {
  const session = await auth();
  if (!session) redirect(routes.auth.sub.login.url);

  const res = await fetch(`${process.env.API_URL}/api/v1/catalog-items/${id}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: {
      tags: [tags.catalogItems.getById(id), tags.catalogItems.getByIdAny],
    },
  });

  const data = await res.json();

  return data as ApiResponse<CatalogItem>;
}
