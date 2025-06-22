import { UpdateProductTypeForm } from "@/components/forms/update-product-type-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getProductTypeById } from "@/services/get-product-type-by-id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.productTypes.sub.edit.title,
};

export default async function EditProductType({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params;

  const { data: productType } = await getProductTypeById(id);

  return (
    <Section>
      <SectionHeader
        title="Editar tipo de produto"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <UpdateProductTypeForm productType={productType} />
      </SectionContent>
    </Section>
  );
}
