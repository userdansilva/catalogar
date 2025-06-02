import { UpdateProductTypeForm } from "@/components/forms/update-product-type-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getProductTypeById } from "@/services/get-product-type-by-id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.productTypes.sub.edit.title,
};

type EditProductTypeProps = {
  params: {
    id: string
  }
}

export default async function EditProductType(props: EditProductTypeProps) {
  const { data: productType } = await getProductTypeById(props.params.id);

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
