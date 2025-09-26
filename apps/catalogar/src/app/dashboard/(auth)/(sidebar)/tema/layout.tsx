import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PageHeader } from "@/components/layout/page-header";
import { PrevButton } from "@/components/inputs/prev-button";

export default function CompanyLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton url={routes.dashboard.url} />

      <PageHeader
        title={routes.theme.title}
        description="Personalize o tema do seu catálogo."
      />

      {children}
    </div>
  );
}
