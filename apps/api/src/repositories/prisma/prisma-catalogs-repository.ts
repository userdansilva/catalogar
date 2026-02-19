import type { Catalog, Prisma } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { CatalogsRepository } from "../catalogs-repository";

export class PrismaCatalogsRepository implements CatalogsRepository {
  async create(data: Prisma.CatalogUncheckedCreateInput): Promise<Catalog> {
    const catalog = await prisma.catalog.create({
      data,
    });

    return catalog;
  }

  async existsById(id: string): Promise<boolean> {
    const catalog = await this.findById(id);

    return !!catalog;
  }

  async findById(id: string): Promise<Catalog | null> {
    const catalog = await prisma.catalog.findUnique({
      where: {
        id,
      },
    });

    return catalog;
  }

  async findByUserId(userId: string): Promise<Catalog | null> {
    const catalog = await prisma.catalog.findUnique({
      where: {
        user_id: userId,
      },
    });

    return catalog;
  }
}
