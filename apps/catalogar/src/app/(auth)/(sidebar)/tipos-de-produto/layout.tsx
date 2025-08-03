import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PageHeader } from "@/components/layout/page-header";
import { PrevButton } from "@/components/inputs/prev-button";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <PageHeader
        title={routes.productTypes.title}
        description="Estes são os tipos de produto cadastrados. Adicione, 
        edite, desative ou exclua conforme precisar."
      />

      {children}
    </div>
  );
}
