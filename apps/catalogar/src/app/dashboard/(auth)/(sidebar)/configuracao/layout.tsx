import type { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PageHeader } from "@/components/layout/page-header";
import { PrevButton } from "@/components/inputs/prev-button";

export default function ConfigLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton url={routes.dashboard.url} />

      <PageHeader
        title={routes.config.title}
        description="Estas são as configurações do seu catálogo. Você pode atualizá-las a qualquer momento."
      />

      {children}
    </div>
  );
}
