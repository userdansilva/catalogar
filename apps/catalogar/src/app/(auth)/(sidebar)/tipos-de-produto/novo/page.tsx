import { Metadata } from "next";
import { CreateProductTypeForm } from "@/components/forms/create-product-type-form";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.productTypes.sub.new.title,
};

export default async function NewProductType({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return <CreateProductTypeForm callbackUrl={callbackUrl} />;
}
