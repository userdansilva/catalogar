import { z } from "zod";

/**
 * Catalog Filters
 */
export const queryFilterSchema = z.object({
  query: z.string(),
});
