import prisma from "@/lib/prisma";
import { getSession } from "@/utils/get-session";
import { CatalogSwitcherClient } from "./client";

export async function CatalogSwitcher() {
  const session = await getSession();

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: session.user.email },
    include: {
      currentCatalog: true,
      catalogs: true,
    },
  });

  if (!user.currentCatalog) {
    throw new Error("Current catalog not found for the user.");
  }

  return (
    <CatalogSwitcherClient
      catalogs={user.catalogs}
      currentCatalog={user.currentCatalog}
    />
  );
}
