import type z from "zod";
import {
  type Catalog,
  publishCatalogSchema,
  updateCatalogSchema,
} from "@/schemas/catalog";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { serverFetch } from "@/utils/server-fetch";

const bodySchema = updateCatalogSchema.or(publishCatalogSchema);

type CatalogType = z.infer<typeof Catalog>;
type Body = z.infer<typeof bodySchema>;

export async function putCatalog(body: Body) {
  const headers = await getAuthHeaders();

  return await serverFetch<CatalogType>("/v1/catalogs", {
    method: "PUT",
    body,
    headers,
  });
}
