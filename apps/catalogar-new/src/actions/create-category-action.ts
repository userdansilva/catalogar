"use server";

import { headers } from "next/headers";
import { createCategory } from "@/gen/categories/categories";
import { authActionClient } from "@/lib/next-safe-action";
import { createCategorySchema } from "@/schemas/create-category-schema";

export const createCategoryAction = authActionClient
  .inputSchema(createCategorySchema)
  .metadata({
    actionName: "create-category",
  })
  .action(async ({ parsedInput: { name }, ctx: { options } }) => {
    const headersList = await headers();

    const { data, status } = await createCategory(
      {
        name,
      },
      options,
    );

    if (status !== 201) {
      console.log("status", status);
      throw new Error("Failed to create category");
    }

    return {
      category: data.category,
    };
  });
