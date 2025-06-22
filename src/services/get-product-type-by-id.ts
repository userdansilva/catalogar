import { auth } from "@/auth";
import { routes } from "@/routes";
import { tags } from "@/tags";
import { ApiResponse } from "@/types/api-response";
import { ProductType } from "@/types/api-types";
import { redirect } from "next/navigation";

export async function getProductTypeById(id: string) {
  const session = await auth();
  if (!session) redirect(routes.auth.sub.login.url);

  const res = await fetch(`${process.env.API_URL}/api/v1/product-types/${id}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: { tags: [tags.productTypes.getById(id)] },
  });

  const data = await res.json();

  return data as ApiResponse<ProductType>;
}
