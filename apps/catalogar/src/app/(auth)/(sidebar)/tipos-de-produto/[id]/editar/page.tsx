import { Metadata } from "next";
import { UpdateProductTypeForm } from "@/components/forms/update-product-type-form";
import { routes } from "@/routes";
import { getProductTypeById } from "@/services/get-product-type-by-id";
import { ExpectedError } from "@/components/error-handling/expected-error";

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

  const [error, data] = await getProductTypeById(id);

  if (error) {
    return <ExpectedError error={error} />;
  }

  return <UpdateProductTypeForm productType={data.data} />;
}
