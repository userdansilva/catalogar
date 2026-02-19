import z from "zod";
import { logoSchema } from "@/schemas/logo";
import { type Theme, themeSchema } from "@/schemas/theme";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const bodySchema = z.object({
  primaryColor: themeSchema.shape.primaryColor,
  secondaryColor: themeSchema.shape.secondaryColor,
  logo: z
    .object({
      fileName: logoSchema.shape.fileName,
      url: logoSchema.shape.url,
      sizeInBytes: logoSchema.shape.sizeInBytes,
      width: logoSchema.shape.width,
      height: logoSchema.shape.height,
      altText: logoSchema.shape.altText,
    })
    .optional(),
});

type Body = z.infer<typeof bodySchema>;

export async function putTheme(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<Theme>("/v1/themes", {
    method: "PUT",
    body,
    headers,
  });
}
