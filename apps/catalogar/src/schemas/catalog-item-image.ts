import { z } from "zod";

export const CatalogItemImage = z.object({
  id: z.uuid({ version: "v4" }),
  fileName: z.string(),
  url: z.string(),
  sizeInBytes: z.number(),
  width: z.number(),
  height: z.number(),
  altText: z.string().optional(),
  position: z.number(),
  createdAt: z.string(),
});
