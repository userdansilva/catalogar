import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { getProductTypes } from "@/services/get-product-types";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";

export default async function Layout({
  children,
}: PropsWithChildren) {
  const { data: productTypes } = await getProductTypes();

  if (productTypes.length === 0) {
    redirect(routes.productTypes.sub.createFirst.url);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={routes.productTypes.title}
        description={routes.productTypes.description}
      />

      {children}
    </div>
  );
}
