import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { PrevButton } from "@/components/inputs/prev-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.createFirst.title,
};

export default async function CreateFirstCatalogItem({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getSession();

  const currentCatalog = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: session.user.currentCatalogId,
    },
    include: {
      catalogItems: true,
      productTypes: true,
      categories: true,
    },
  });

  const { catalogItems, categories, productTypes } = currentCatalog;
  const { callbackUrl } = await searchParams;

  if (catalogItems.length >= 1 && !callbackUrl) {
    return redirect(routes.catalogItems.url, RedirectType.replace);
  }

  return (
    <div className="max-w-2xl space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Vamos cadastrar seu{" "}
          <span className="font-bold">Item de Catálogo</span>
        </h2>

        <p className="text-muted-foreground">
          Qual item você quer exibir? Agora você pode adicinar a foto, título,
          descrição, tipo de produto e categoria(s).
        </p>
      </div>

      <CreateCatalogItemForm
        productTypes={productTypes}
        categories={categories}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
