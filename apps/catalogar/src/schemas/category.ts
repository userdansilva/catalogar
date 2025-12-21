import { z } from "zod";

export const Category = z.object({
  id: z.uuid({ version: "v4" }),
  name: z.string(),
  textColor: z.string(),
  backgroundColor: z.string(),
  isDisabled: z.boolean(),
});

// export const createCategorySchema = category.pick({
//   name: true,
//   textColor: true,
//   backgroundColor: true,
//   isDisabled: true,
// });

// export const updateCategorySchema = category.pick({
//   id: true,
//   name: true,
//   textColor: true,
//   backgroundColor: true,
//   isDisabled: true,
// });

// export const categoryStatusToggleSchema = category.pick({
//   id: true,
// });
