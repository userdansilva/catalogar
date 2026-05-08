import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export async function getCatalogItems() {
  const user = await getUser();

  const catalogItems = await prisma.catalogItem.findMany({
    where: {
      catalogId: user.currentCatalog.id,
    },
    include: {
      categories: true,
      productType: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { catalogItems };
}
