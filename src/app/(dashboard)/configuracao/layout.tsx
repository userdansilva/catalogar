import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";

export default function ConfigLayout({
  children,
}: PropsWithChildren) {
  return (
    <Page>
      <PageHeader
        title={routes.config.title}
        description={routes.config.description}
      />

      {children}
    </Page>
  );
}
