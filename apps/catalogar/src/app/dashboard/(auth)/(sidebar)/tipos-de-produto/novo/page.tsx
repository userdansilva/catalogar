import type { Metadata } from "next";
import { CreateProductTypeForm } from "@/components/forms/create-product-type-form";
import { routes } from "@/routes";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: routes.productTypes.sub.new.title,
};

export default async function NewProductType({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="space-y-6">
      <PrevButton url={routes.productTypes.url} />

      <PageHeader
        title={routes.productTypes.sub.new.title}
        description="Qual o nome do tipo de produto que quer adicionar?"
      />

      <CreateProductTypeForm callbackUrl={callbackUrl} />
    </div>
  );
}
