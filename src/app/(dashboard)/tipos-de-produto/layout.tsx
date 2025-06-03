import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";
import { getProductTypes } from "@/services/get-product-types";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: PropsWithChildren) {
  const { data: productTypes } = await getProductTypes();

  if (productTypes.length === 0) {
    redirect(routes.productTypes.sub.createFirst.url);
  }

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
