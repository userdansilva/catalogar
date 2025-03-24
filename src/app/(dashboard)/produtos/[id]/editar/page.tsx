import { UpdateProductForm } from "@/components/forms/update-product-form";
import { Page, PageHeader } from "@/components/page-layout/page";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { getProductById } from "@/services/get-product-by-id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Produto | Catalogar",
};

type EditProductProps = {
  params: {
    id: string
  }
}

export default async function EditProduct(props: EditProductProps) {
  const { data: product } = await getProductById(props.params.id);

  return (
    <Page>
      <PageHeader
        title="Produtos"
        description="The king, seeing how much happier his subjects were,
                realized the error of his ways and repealed the joke tax."
      />

      <Section>
        <SectionHeader
          title="Editar produto"
          description="This is how others will see you on the site."
        />

        <SectionContent>
          <UpdateProductForm product={product} />
        </SectionContent>
      </Section>
    </Page>
  );
}
