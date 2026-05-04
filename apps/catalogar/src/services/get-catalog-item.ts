import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export async function getCatalogItem(id: string) {
  const user = await getUser();

  const catalogItem = await prisma.catalogItem.findUnique({
    where: {
      id,
      catalogId: user.currentCatalog.id,
    },
    include: {
      images: true,
      categories: true,
    },
  });

  return { catalogItem };
}
