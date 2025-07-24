import { Metadata } from "next";
import { redirect } from "next/navigation";
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
  const { callbackUrl } = await searchParams;
  const { data: catalogItems } = await getCatalogItems();

  if (catalogItems.length >= 1) {
    return redirect(routes.productTypes.url);
  }

  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();

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
