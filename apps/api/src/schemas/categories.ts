import z from "zod";

export const categoryDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CategoryDto = z.infer<typeof categoryDtoSchema>;

z.globalRegistry.add(categoryDtoSchema, { id: "Category" });

export const getCategoriesSchema = z.object({
  categories: z.array(categoryDtoSchema),
});

export const getCategorySchema = z.object({
  category: categoryDtoSchema,
});

export const createCategorySchema = z.object({
  name: z.string(),
});

export const updateCategorySchema = z.object({
  name: z.string(),
});
