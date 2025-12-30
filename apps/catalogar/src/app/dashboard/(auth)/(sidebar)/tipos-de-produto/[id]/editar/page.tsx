import type { Metadata } from "next";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { UpdateProductTypeForm } from "@/components/forms/update-product-type-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { routes } from "@/routes";
import { getProductType } from "@/services/get-product-type";

export const metadata: Metadata = {
  title: routes.productTypes.sub.edit.title,
};

export default async function EditProductType({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const [error, data] = await getProductType(id);

  if (error) {
    return <ExpectedError error={error} />;
  }

  const productType = data.data;

  return (
    <div className="space-y-6">
      <PrevButton url={routes.productTypes.url} />

      <PageHeader
        title={productType.name}
        description="Altere os dados e clique em salvar alterações!"
      />

      <UpdateProductTypeForm productType={productType} />
    </div>
  );
}
