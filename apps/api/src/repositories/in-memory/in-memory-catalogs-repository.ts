import type { Catalog, Prisma } from "generated/prisma/client";
import type { CatalogsRepository } from "../catalogs-repository";

export class InMemoryCatalogsRepository implements CatalogsRepository {
  private catalogs: Catalog[] = [];

  async create(data: Prisma.CatalogUncheckedCreateInput): Promise<Catalog> {
    const catalog: Catalog = {
      id: crypto.randomUUID(),
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.catalogs.push(catalog);

    return catalog;
  }

  async existsById(id: string): Promise<boolean> {
    const catalog = await this.findById(id);

    return !!catalog;
  }

  async findById(id: string): Promise<Catalog | null> {
    const catalog = this.catalogs.find((catalog) => catalog.id === id);

    if (!catalog) return null;

    return catalog;
  }

  async findByUserId(userId: string): Promise<Catalog | null> {
    const catalog = this.catalogs.find((catalog) => catalog.user_id === userId);

    if (!catalog) return null;

    return catalog;
  }
}
