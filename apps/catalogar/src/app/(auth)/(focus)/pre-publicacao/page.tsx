import { redirect, RedirectType } from "next/navigation";
import { PrevButton } from "@/components/inputs/prev-button";
import { PublishRequirements } from "@/components/publish-requirements";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getProductTypes } from "@/services/get-product-types";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/components/error-handling/expected-error";

export default async function Page() {
  const [userError, userData] = await getUser();

  if (userError) {
    return <ExpectedError error={userError} />;
  }

  const user = userData.data;

  if (!user.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  const [
    [productTypesError, productTypesData],
    [catalogItemsError, catalogItemsData],
  ] = await Promise.all([getProductTypes(), getCatalogItems()]);

  if (productTypesError) {
    return <ExpectedError error={productTypesError} />;
  }

  if (catalogItemsError) {
    return <ExpectedError error={catalogItemsError} />;
  }

  const productTypes = productTypesData.data;
  const catalogItems = catalogItemsData.data;

  return (
    <div className="max-w-xl space-y-8">
      <PrevButton url={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Oba! Vamos publicar seu <span className="font-bold">catálogo!</span>
        </h2>

        <p className="text-muted-foreground">
          Conseguiu concluir todas as etapas? Se já tiver finalizado os itens da
          lista abaixo, é só definir o seu link customizado e publicar!
        </p>
      </div>

      <PublishRequirements
        user={user}
        productTypes={productTypes}
        catalogItems={catalogItems}
      />
    </div>
  );
}
