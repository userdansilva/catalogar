import z from "zod";
import { type Catalog, catalogSchema } from "@/schemas/catalog";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const bodySchema = z.object({
  name: catalogSchema.shape.name,
});

type Body = z.infer<typeof bodySchema>;

export async function postCatalog(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<Catalog>("/v1/catalogs", {
    method: "POST",
    body,
    headers,
  });
}
