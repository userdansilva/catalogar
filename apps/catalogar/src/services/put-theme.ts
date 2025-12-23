import type { Theme, UpdateTheme } from "@/schemas/theme";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

export async function putTheme(body: UpdateTheme) {
  const headers = await getAuthHeaders();

  return await serverFetch<Theme>("/v1/themes", {
    method: "PUT",
    body,
    headers,
  });
}
