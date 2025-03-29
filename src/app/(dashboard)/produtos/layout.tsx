import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";

export default function ProductsLayout({
  children,
}: PropsWithChildren) {
  return (
    <Page>
      <PageHeader
        title={routes.products.title}
        description={routes.products.description}
      />

      {children}
    </Page>
  );
}
