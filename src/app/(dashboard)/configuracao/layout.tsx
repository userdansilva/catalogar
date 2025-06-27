import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PageHeader } from "@/components/layout/page-header";

export default function ConfigLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={routes.config.title}
        description={routes.config.description}
      />

      {children}
    </div>
  );
}
