import type { Item, Prisma } from "generated/prisma/client";
import type { ItemsRepository } from "../items-repository";

export class InMemoryItemsRepository implements ItemsRepository {
  private items: Item[] = [];

  async create(data: Prisma.ItemUncheckedCreateInput): Promise<Item> {
    const item: Item = {
      id: crypto.randomUUID(),
      name: data.name,
      catalog_id: data.catalog_id,
      category_id: data.category_id ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(item);

    return item;
  }

  async update(
    id: string,
    data: Prisma.ItemUncheckedUpdateInput,
  ): Promise<Item> {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    const item = this.items[itemIndex];

    if (itemIndex === -1 || !item) {
      throw new Error("Item not found");
    }

    const updatedItem: Item = {
      ...item,
      name: typeof data.name === "string" ? data.name : item.name,
      category_id:
        typeof data.category_id === "string"
          ? data.category_id
          : item.category_id,
      updated_at: new Date(),
    };

    this.items[itemIndex] = updatedItem;

    return updatedItem;
  }

  async existsByIdAndCatalogId(
    id: string,
    catalogId: string,
  ): Promise<boolean> {
    const item = await this.findByIdAndCatalogId(id, catalogId);

    return !!item;
  }

  async findByIdAndCatalogId(
    id: string,
    catalogId: string,
  ): Promise<Item | null> {
    const item = this.items.find(
      (item) => item.id === id && item.catalog_id === catalogId,
    );

    if (!item) return null;

    return item;
  }
}
