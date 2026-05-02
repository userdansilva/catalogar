import type { Category } from "generated/prisma/client";
import type { CategoryDto } from "@/schemas/categories";

export function toCategoryDto(category: Category): CategoryDto {
  return {
    id: category.id,
    name: category.name,
    createdAt: category.created_at,
    updatedAt: category.updated_at,
  };
}
