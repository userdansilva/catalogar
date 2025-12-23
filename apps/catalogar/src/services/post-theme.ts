import type { CreateTheme, Theme } from "@/schemas/theme";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function postTheme(body: CreateTheme) {
  const headers = await getAuthHeaders();

  return await serverFetch<Theme>("/v1/themes", {
    method: "POST",
    body,
    headers,
  });
}
