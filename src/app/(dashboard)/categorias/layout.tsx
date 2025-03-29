import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";

export default function CategoriesLayout({
  children,
}: PropsWithChildren) {
  return (
    <Page>
      <PageHeader
        title={routes.categories.title}
        description={routes.categories.description}
      />

      {children}
    </Page>
  );
}
