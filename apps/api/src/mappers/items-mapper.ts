import type { Category, Item } from "generated/prisma/client";
import type { ItemDto } from "@/schemas/items";
import { toCategoryDto } from "./categories-mapper";

export function toItemDto(
  item: Item & {
    category: Category | null;
  },
): ItemDto {
  return {
    id: item.id,
    name: item.name,
    category: item.category ? toCategoryDto(item.category) : null,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}
