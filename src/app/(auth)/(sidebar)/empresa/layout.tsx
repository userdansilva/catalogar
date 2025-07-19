import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PageHeader } from "@/components/layout/page-header";
import { PrevButton } from "@/components/prev-button";

export default function CompanyLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <PageHeader
        title={routes.company.title}
        description="Aqui você pode atualizar as informações da sua empresa"
      />

      {children}
    </div>
  );
}
