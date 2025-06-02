import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <Page>
      <PageHeader
        title={routes.productTypes.title}
        description={routes.productTypes.description}
      />

      {children}
    </Page>
  );
}
