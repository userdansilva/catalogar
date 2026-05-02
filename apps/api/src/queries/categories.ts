import { prisma } from "@/lib/prisma";

export async function getCategories({ catalogId }: { catalogId: string }) {
  const categories = await prisma.category.findMany({
    where: {
      catalog_id: catalogId,
    },
  });

  return categories;
}

export async function createCategory({
  name,
  catalogId,
}: {
  name: string;
  catalogId: string;
}) {
  const category = await prisma.category.create({
    data: {
      name,
      catalog_id: catalogId,
    },
  });

  return category;
}

export async function deleteCategory({
  id,
  catalogId,
}: {
  id: string;
  catalogId: string;
}) {
  await prisma.category.delete({
    where: {
      id,
      catalog_id: catalogId,
    },
  });
}

export async function getCategory({
  id,
  catalogId,
}: {
  id: string;
  catalogId: string;
}) {
  const category = await prisma.category.findFirst({
    where: {
      id,
      catalog_id: catalogId,
    },
  });

  return category;
}

export async function updateCategory({
  id,
  name,
  catalogId,
}: {
  id: string;
  name: string;
  catalogId: string;
}) {
  const category = await prisma.category.update({
    where: {
      id,
      catalog_id: catalogId,
    },
    data: {
      name,
    },
  });

  return category;
}
