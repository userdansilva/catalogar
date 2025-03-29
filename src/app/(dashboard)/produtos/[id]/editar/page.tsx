import { UpdateProductForm } from "@/components/forms/update-product-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getProductById } from "@/services/get-product-by-id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.products.sub.edit.title,
};

type EditProductProps = {
  params: {
    id: string
  }
}

export default async function EditProduct(props: EditProductProps) {
  const { data: product } = await getProductById(props.params.id);

  return (
    <Section>
      <SectionHeader
        title="Editar produto"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <UpdateProductForm product={product} />
      </SectionContent>
    </Section>
  );
}
