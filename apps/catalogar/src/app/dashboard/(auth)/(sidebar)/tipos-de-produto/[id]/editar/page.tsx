import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdateProductTypeForm } from "@/components/forms/update-product-type-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.productTypes.sub.edit.title,
};

export default async function EditProductType({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const session = await getSession();

  const { id } = await params;

  const productType = await prisma.productType.findUnique({
    where: {
      id,
      catalogId: session.user.currentCatalogId,
    },
  });

  if (!productType) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.productTypes.url} />

      <PageHeader
        title={productType.name}
        description="Altere os dados e clique em salvar alterações!"
      />

      <UpdateProductTypeForm productType={productType} />
    </div>
  );
}
