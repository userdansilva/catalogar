import z from "zod";
import { catalogSchema } from "./catalog";

export const userSchema = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string().optional(),
  catalogs: z.array(catalogSchema),
  currentCatalog: catalogSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
