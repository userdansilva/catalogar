import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";

export default function CompanyLayout({
  children,
}: PropsWithChildren) {
  return (
    <Page>
      <PageHeader
        title={routes.company.title}
        description={routes.company.description}
      />

      {children}
    </Page>
  );
}
