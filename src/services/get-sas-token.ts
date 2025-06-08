import { auth } from "@/auth";
import { routes } from "@/routes";
import { ApiResponse } from "@/types/api-response";
import { CatalogItemImage } from "@/types/api-types";
import { redirect } from "next/navigation";

export async function getSasToken(fileName: string) {
  const session = await auth();
  if (!session) redirect(routes.auth.sub.login.url);

  const res = await fetch(`${process.env.API_URL}/api/v1/images/generate-sas-token?fileName=${fileName}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: "no-cache",
  });

  const data = await res.json();

  return data as ApiResponse<CatalogItemImage>;
}
