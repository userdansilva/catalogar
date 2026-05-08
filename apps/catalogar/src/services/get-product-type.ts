import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export async function getProductType(id: string) {
  const user = await getUser();

  const productType = await prisma.productType.findFirst({
    where: {
      id,
      catalogId: user.currentCatalog.id,
    },
  });

  return { productType };
}
