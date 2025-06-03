import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.createFirst.title,
};

export default async function CreateFirstCatalogItem({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;
  const { data: catalogItems } = await getCatalogItems();

  if (catalogItems.length >= 1) {
    return redirect(routes.productTypes.url);
  }

  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();

  return (
    <div className="max-w-lg space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Opa! Vamos cadastrar seu
          {" "}
          <span className="font-bold">Item de Catálogo</span>
        </h2>

        <p className="text-muted-foreground">
          As informações abaixo ajudam seus clientes — e futuros clientes — a
          conhecer melhor sua empresa.
          Tudo isso será exibido no seu catálogo e vai facilitar o contato,
          além de fortalecer a conexão com seu público. Bora começar?
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
