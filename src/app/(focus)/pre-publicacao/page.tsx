import { PrevButton } from "@/components/prev-button";
import { PublishRequirements } from "@/components/publish-requirements";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getProductTypes } from "@/services/get-product-types";
import { getUser } from "@/services/get-user";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data: user } = await getUser();

  if (!user.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url);
  }

  const { data: productTypes } = await getProductTypes();
  const { data: catalogItems } = await getCatalogItems();

  return (
    <div className="max-w-xl space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Opa! Vamos cadastrar seu <span className="font-bold">Tema</span>
        </h2>

        <p className="text-muted-foreground">
          Agora é hora de deixar seu catálogo com a identidade da sua empresa.
          Defina as cores e adicione sua logo para que tudo fique com a cara do
          seu negócio — mais profissional, reconhecível e alinhado com a marca.
          Vamos lá?
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
