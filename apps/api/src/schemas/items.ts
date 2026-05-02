import z from "zod";

export const itemDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  category: z
    .object({
      id: z.uuid(),
      name: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ItemDto = z.infer<typeof itemDtoSchema>;

z.globalRegistry.add(itemDtoSchema, { id: "Item" });

export const getItemsSchema = z.object({
  items: z.array(itemDtoSchema),
});

export const getItemSchema = z.object({
  item: itemDtoSchema,
});

export const createItemSchema = z.object({
  name: z.string().min(1),
  categoryId: z.uuid().optional(),
});

export const updateItemSchema = z.object({
  name: z.string().min(1).optional(),
  categoryId: z.uuid().optional(),
});
