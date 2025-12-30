import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.createFirst.title,
};

export default async function CreateFirstCatalogItem({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const [errorCatalogItems, dataCatalogItems] = await getCatalogItems();

  if (errorCatalogItems) {
    return <ExpectedError error={errorCatalogItems} />;
  }

  const { callbackUrl } = await searchParams;

  if (dataCatalogItems.data.length >= 1 && !callbackUrl) {
    return redirect(routes.catalogItems.url, RedirectType.replace);
  }

  const [
    [errorProductTypes, dataProductTypes],
    [errorCategories, dataCategories],
  ] = await Promise.all([getProductTypes(), getCategories()]);

  if (errorProductTypes) {
    return <ExpectedError error={errorProductTypes} />;
  }

  if (errorCategories) {
    return <ExpectedError error={errorCategories} />;
  }

  return (
    <div className="max-w-2xl space-y-8">
      <PrevButton url={routes.dashboard.url} />

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
        productTypes={dataProductTypes.data}
        categories={dataCategories.data}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
