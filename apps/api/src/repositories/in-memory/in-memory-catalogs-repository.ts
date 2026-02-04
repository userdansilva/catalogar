import { randomUUID } from "node:crypto";
import type { Catalog } from "generated/prisma/client";
import type { CatalogUncheckedCreateInput } from "generated/prisma/models";
import type { CatalogsRepository } from "../catalogs-repository";

export class InMemoryCatalogsRespository implements CatalogsRepository {
  public catalogs: Catalog[] = [];

  async create(data: CatalogUncheckedCreateInput): Promise<Catalog> {
    const catalog: Catalog = {
      id: randomUUID(),
      name: data.name,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.catalogs.push(catalog);

    return catalog;
  }

  async findByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<Catalog | null> {
    const catalog = this.catalogs.find(
      (catalog) => catalog.name === name && catalog.user_id === userId,
    );

    if (!catalog) return null;

    return catalog;
  }

  async existsByNameAndUserId(name: string, userId: string): Promise<boolean> {
    const catalog = await this.findByNameAndUserId(name, userId);

    return !!catalog;
  }
}
