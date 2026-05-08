import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export async function getProductTypes() {
  const user = await getUser();

  const productTypes = await prisma.productType.findMany({
    where: {
      catalogId: user.currentCatalog.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { productTypes };
}
