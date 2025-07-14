import { Metadata } from "next";
import { UpdateProductTypeForm } from "@/components/forms/update-product-type-form";
import { routes } from "@/routes";
import { getProductTypeById } from "@/services/get-product-type-by-id";

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

  const { data: productType } = await getProductTypeById(id);

  return <UpdateProductTypeForm productType={productType} />;
}
