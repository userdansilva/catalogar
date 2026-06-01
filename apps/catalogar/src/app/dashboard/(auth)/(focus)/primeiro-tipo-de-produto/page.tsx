import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { CreateProductTypeForm } from "@/components/forms/create-product-type-form";
import { PrevButton } from "@/components/inputs/prev-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.productTypes.sub.createFirst.title,
};

export default async function CreateFirstProductType({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getSession();

  const productTypesCount = await prisma.productType.count({
    where: {
      catalogId: session.user.currentCatalogId,
    },
  });

  const { callbackUrl } = await searchParams;

  if (productTypesCount >= 1 && !callbackUrl) {
    return redirect(routes.productTypes.url, RedirectType.replace);
  }

  return (
    <div className="max-w-lg space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Vamos cadastrar seu <span className="font-bold">Tipo de Produto</span>
        </h2>

        <p className="text-muted-foreground">
          Quais produtos sua empresa vende? Comece colocando um primeiro tipo.
        </p>
      </div>

      <CreateProductTypeForm callbackUrl={callbackUrl} />
    </div>
  );
}
