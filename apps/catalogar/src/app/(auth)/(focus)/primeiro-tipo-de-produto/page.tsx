import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { CreateProductTypeForm } from "@/components/forms/create-product-type-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getProductTypes } from "@/services/get-product-types";

export const metadata: Metadata = {
  title: routes.productTypes.sub.createFirst.title,
};

export default async function CreateFirstProductType({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const { data: productTypes } = await getProductTypes();

  if (productTypes.length >= 1 && !callbackUrl) {
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
