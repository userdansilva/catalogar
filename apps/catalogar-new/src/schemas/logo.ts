import z from "zod";

export const logoSchema = z.object({
  id: z.uuidv4(),
  fileName: z.string(),
  url: z.string(),
  sizeInBytes: z.number(),
  width: z.number(),
  height: z.number(),
  altText: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Logo = z.infer<typeof logoSchema>;
