import type z from "zod";
import type { createThemeSchema, Theme } from "@/schemas/theme";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

type ThemeType = z.infer<typeof Theme>;
type Body = z.infer<typeof createThemeSchema>;

export async function postTheme(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<ThemeType>("/v1/themes", {
    method: "POST",
    body,
    headers,
  });
}
