import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";

export default function CatalogLayout({
  children,
}: PropsWithChildren) {
  return (
    <Page>
      <PageHeader
        title={routes.catalogItems.title}
        description={routes.catalogItems.description}
      />

      {children}
    </Page>
  );
}
