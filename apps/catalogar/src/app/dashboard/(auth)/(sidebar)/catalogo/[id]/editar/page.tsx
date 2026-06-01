import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdateCatalogItemForm } from "@/components/forms/update-catalog-item-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.edit.title,
};

export default async function EditCatalogItem({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const session = await getSession();
  const { id } = await params;

  const { productTypes, categories } = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: session.user.currentCatalogId,
    },
    include: {
      productTypes: true,
      categories: true,
    },
  });

  const catalogItem = await prisma.catalogItem.findUnique({
    where: {
      id,
      catalogId: session.user.currentCatalogId,
    },
    include: {
      categories: true,
      productType: true,
      images: true,
    },
  });

  if (!catalogItem) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.catalogItems.url} />

      <PageHeader
        title={catalogItem.title}
        description="Altere os dados e clique em salvar alterações!"
      />

      <UpdateCatalogItemForm
        catalogItem={{
          ...catalogItem,
          price: catalogItem.price?.toString() ?? null,
        }}
        productTypes={productTypes}
        categories={categories}
      />
    </div>
  );
}
