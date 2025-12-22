import type z from "zod";
import type { Theme, updateThemeSchema } from "@/schemas/theme";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type ThemeType = z.infer<typeof Theme>;
type Body = z.infer<typeof updateThemeSchema>;

export async function putTheme(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<ThemeType>("/v1/themes", {
    method: "PUT",
    body,
    headers,
  });
}
