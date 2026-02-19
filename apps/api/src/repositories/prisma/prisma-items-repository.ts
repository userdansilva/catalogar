import type { Item, Prisma } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { ItemsRepository } from "../items-repository";

export class PrismaItemsRepository implements ItemsRepository {
  async create(data: Prisma.ItemUncheckedCreateInput): Promise<Item> {
    const item = await prisma.item.create({
      data,
    });

    return item;
  }

  async update(
    id: string,
    data: Prisma.ItemUncheckedCreateInput,
  ): Promise<Item> {
    const item = await prisma.item.update({
      where: {
        id,
      },
      data,
    });

    return item;
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
    const item = await prisma.item.findFirst({
      where: {
        id,
        catalog_id: catalogId,
      },
    });

    return item;
  }
}
