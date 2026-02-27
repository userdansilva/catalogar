import { prisma } from "@/lib/prisma";

export async function getCategoriesByCatalogId(catalogId: string) {
  const categories = await prisma.category.findMany({
    where: {
      catalog_id: catalogId,
    },
  });

  return categories;
}

type CreateCategoryParams = {
  name: string;
};

export async function createCategory(
  catalogId: string,
  data: CreateCategoryParams,
) {
  const category = await prisma.category.create({
    data: {
      catalog_id: catalogId,
      name: data.name,
    },
  });

  return category;
}

export async function getCategoryByIdAndCatalogId(
  id: string,
  catalogId: string,
) {
  const category = await prisma.category.findFirst({
    where: {
      id,
      catalog_id: catalogId,
    },
  });

  return category;
}

export async function getCategoryByNameAndCatalogId(
  name: string,
  catalogId: string,
) {
  const category = await prisma.category.findFirst({
    where: {
      name,
      catalog_id: catalogId,
    },
  });

  return category;
}
