import { Metadata } from "next";
import { Page, PageHeader } from "@/components/page-layout/page";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { CreateProductForm } from "@/components/forms/create-product-form";

export const metadata: Metadata = {
  title: "Novo Produto | Catalogar",
};

export default function NewProduct() {
  return (
    <Page>
      <PageHeader
        title="Produtos"
        description="The king, seeing how much happier his subjects were,
            realized the error of his ways and repealed the joke tax."
      />

      <Section>
        <SectionHeader
          title="Novo produto"
          description="This is how others will see you on the site."
        />

        <SectionContent>
          <CreateProductForm />
        </SectionContent>
      </Section>
    </Page>
  );
}
