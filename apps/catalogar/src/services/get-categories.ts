import prisma from "@/lib/prisma";
import { getUser } from "./get-user";

export async function getCategories() {
  const user = await getUser();

  const categories = await prisma.category.findMany({
    where: {
      catalog: user.currentCatalog,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { categories };
}
