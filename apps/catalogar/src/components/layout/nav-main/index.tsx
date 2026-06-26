import prisma from "@/lib/prisma";
import { getSession } from "@/utils/get-session";
import { NavMainClient } from "./client";

export async function NavMain() {
  const session = await getSession();

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: session.user.email },
    include: {
      currentCatalog: {
        include: {
          company: true,
          theme: true,
          productTypes: true,
          categories: true,
          catalogItems: true,
        },
      },
    },
  });

  if (!user.currentCatalog) {
    throw new Error("Current catalog not found for the user.");
  }

  const { catalogItems, ...currentCatalog } = user.currentCatalog;

  return (
    <NavMainClient
      currentCatalog={{
        ...currentCatalog,
        catalogItems: catalogItems.map((item) => ({
          ...item,
          price: item.price?.toString() ?? null,
        })),
      }}
    />
  );
}
