import type { Metadata } from "next";
import { MyCatalogs } from "@/components/my-catalogs";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const instant = false;

export const metadata: Metadata = {
  title: routes.company.title,
};

export default async function Page() {
  const session = await getSession();

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: session.user.email },
    include: {
      currentCatalog: true,
      catalogs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user.currentCatalog) {
    throw new Error("Current Catalog is required");
  }

  return (
    <MyCatalogs catalogs={user.catalogs} currentCatalog={user.currentCatalog} />
  );
}
