import type { Metadata } from "next";
import { UpdateCatalogForm } from "@/components/forms/update-catalog-form";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.config.title,
};

export default async function Settings({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getSession();

  const currentCatalog = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: session.user.currentCatalogId,
    },
  });

  const { callbackUrl } = await searchParams;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Catálogo</h3>

      <UpdateCatalogForm catalog={currentCatalog} callbackUrl={callbackUrl} />
    </div>
  );
}
