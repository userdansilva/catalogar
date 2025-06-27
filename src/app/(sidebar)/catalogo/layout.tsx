import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { getCatalogItems } from "@/services/get-catalog-items";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";

export default async function Layout({
  children,
}: PropsWithChildren) {
  const { data: catalogItems } = await getCatalogItems();

  if (catalogItems.length === 0) {
    redirect(routes.catalogItems.sub.createFirst.url);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={routes.catalogItems.title}
        description={routes.catalogItems.description}
      />

      {children}
    </div>
  );
}
