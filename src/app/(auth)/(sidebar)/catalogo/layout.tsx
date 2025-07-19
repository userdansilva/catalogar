import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { PageHeader } from "@/components/layout/page-header";
import { PrevButton } from "@/components/prev-button";

export default async function Layout({ children }: PropsWithChildren) {
  const { data: catalogItems } = await getCatalogItems();

  if (catalogItems.length === 0) {
    redirect(routes.catalogItems.sub.createFirst.url);
  }

  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <PageHeader
        title={routes.catalogItems.title}
        description="Estes são os itens já cadastrados neste catálogo. Você pode adicionar, editar, ocultar ou excluir um item."
      />

      {children}
    </div>
  );
}
