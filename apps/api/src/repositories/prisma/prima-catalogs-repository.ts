import type { Catalog } from "generated/prisma/client";
import type { CatalogUncheckedCreateInput } from "generated/prisma/models";
import { prisma } from "@/lib/prisma";
import type { CatalogsRepository } from "../catalogs-repository";

export class PrismaCatalogsRepository implements CatalogsRepository {
  async create(data: CatalogUncheckedCreateInput): Promise<Catalog> {
    const catalog = await prisma.catalog.create({
      data,
    });

    return catalog;
  }

  async existsByNameAndUserId(name: string, userId: string): Promise<boolean> {
    const catalog = this.findByNameAndUserId(name, userId);

    return !!catalog;
  }

  async findByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<Catalog | null> {
    const catalog = await prisma.catalog.findFirst({
      where: {
        name,
        user_id: userId,
      },
    });

    return catalog;
  }
}
