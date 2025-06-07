import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: PropsWithChildren) {
  const { data: catalogItems } = await getCatalogItems();

  if (catalogItems.length === 0) {
    redirect(routes.catalogItems.sub.createFirst.url);
  }

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
