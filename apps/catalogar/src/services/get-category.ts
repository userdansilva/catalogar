import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export async function getCategory(id: string) {
  const user = await getUser();

  const category = await prisma.category.findFirst({
    where: {
      id,
      catalogId: user.currentCatalog.id,
    },
  });

  return { category };
}
