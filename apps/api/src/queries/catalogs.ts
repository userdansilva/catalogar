import type { Prisma } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function getCatalogById(id: string) {
  const catalog = await prisma.catalog.findUnique({
    where: {
      id,
    },
  });

  return catalog;
}

export async function catalogExistsById(id: string) {
  const catalog = await getCatalogById(id);

  return !!catalog;
}

export async function createCatalog(data: Prisma.CatalogUncheckedCreateInput) {
  const catalog = await prisma.catalog.create({
    data,
  });

  return catalog;
}
