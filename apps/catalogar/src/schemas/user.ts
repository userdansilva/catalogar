import z from "zod";
import { Catalog } from "./catalog";

export const User = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string().optional(),
  catalogs: z.array(Catalog),
  currentCatalog: Catalog.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
