import type { PropsWithChildren } from "react";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { routes } from "@/routes";

export default function CompanyLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton url={routes.dashboard.url} />

      <PageHeader
        title={routes.company.title}
        description="Estas são as informações da sua empresa. Mantenha sempre atualizadas."
      />

      {children}
    </div>
  );
}
