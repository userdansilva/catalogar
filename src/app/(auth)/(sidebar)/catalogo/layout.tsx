import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PageHeader } from "@/components/layout/page-header";
import { PrevButton } from "@/components/prev-button";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <PageHeader
        title={routes.catalogItems.title}
        description="Gerencie os itens deste catálogo: adicione novos, 
        edite os existentes ou remova o que não precisar mais."
      />

      {children}
    </div>
  );
}
