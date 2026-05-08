import type { PropsWithChildren } from "react";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { routes } from "@/routes";

export default function CompanyLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <PageHeader
        title={routes.theme.title}
        description="Personalize o tema do seu catálogo."
      />

      {children}
    </div>
  );
}
