import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PageHeader } from "@/components/layout/page-header";

export default function CompanyLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={routes.theme.title}
        description={routes.theme.description}
      />

      {children}
    </div>
  );
}
