import { z } from "zod";
import { zfd } from "zod-form-data";

/**
 * Images
 */
export const imageSchema = zfd.formData({
  image: zfd.file(),
});

/**
 * Catalog Filters
 */
export const queryFilterSchema = z.object({
  query: z.string(),
});

/**
 * Common
 */
export const deleteSchema = z.object({
  id: z.uuid({ version: "v4" }),
});
