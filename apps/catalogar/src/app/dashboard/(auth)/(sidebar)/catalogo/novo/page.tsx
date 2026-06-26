import type { Metadata } from "next";
import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.new.title,
};

export default async function NewCatalogItem({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getSession();

  const { productTypes, categories } = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: session.user.currentCatalogId,
    },
    include: {
      productTypes: true,
      categories: true,
    },
  });

  const { callbackUrl } = await searchParams;

  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.catalogItems.url} />

      <PageHeader title={routes.catalogItems.sub.new.title} />

      <CreateCatalogItemForm
        productTypes={productTypes}
        categories={categories}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
