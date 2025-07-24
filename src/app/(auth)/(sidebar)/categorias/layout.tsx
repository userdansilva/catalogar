import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PageHeader } from "@/components/layout/page-header";
import { PrevButton } from "@/components/inputs/prev-button";

export default function CategoriesLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <PageHeader
        title={routes.categories.title}
        description="Estas são as categorias cadastradas neste catálogo. Adicione, 
        edite, desative ou exclua conforme precisar."
      />

      {children}
    </div>
  );
}
