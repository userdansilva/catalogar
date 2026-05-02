import { prisma } from "@/lib/prisma";

export async function createCatalog({ userId }: { userId: string }) {
  const catalog = await prisma.catalog.create({
    data: {
      user_id: userId,
    },
  });

  return catalog;
}
