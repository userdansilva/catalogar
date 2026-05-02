import { prisma } from "@/lib/prisma";

export async function getItems({ catalogId }: { catalogId: string }) {
  const items = await prisma.item.findMany({
    where: {
      catalog_id: catalogId,
    },
    include: {
      category: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return items;
}

export async function createItem({
  name,
  catalogId,
  categoryId,
}: {
  name: string;
  catalogId: string;
  categoryId?: string;
}) {
  const item = await prisma.item.create({
    data: {
      name,
      catalog_id: catalogId,
      category_id: categoryId,
    },
    include: {
      category: true,
    },
  });

  return item;
}

export async function deleteItem({
  id,
  catalogId,
}: {
  id: string;
  catalogId: string;
}) {
  await prisma.item.delete({
    where: {
      id,
      catalog_id: catalogId,
    },
  });
}

export async function getItem({
  id,
  catalogId,
}: {
  id: string;
  catalogId: string;
}) {
  const item = await prisma.item.findFirst({
    where: {
      id,
      catalog_id: catalogId,
    },
    include: {
      category: true,
    },
  });

  return item;
}

export async function updateItem({
  id,
  catalogId,
  name,
  categoryId,
}: {
  id: string;
  catalogId: string;
  name?: string;
  categoryId?: string;
}) {
  const item = await prisma.item.update({
    where: {
      id,
      catalog_id: catalogId,
    },
    data: {
      ...(name && { name }),
      ...(categoryId && { category_id: categoryId }),
    },
    include: {
      category: true,
    },
  });

  return item;
}

export async function getItemsByCategory({
  catalogId,
  categoryId,
}: {
  catalogId: string;
  categoryId: string;
}) {
  const items = await prisma.item.findMany({
    where: {
      catalog_id: catalogId,
      category_id: categoryId,
    },
    include: {
      category: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return items;
}
