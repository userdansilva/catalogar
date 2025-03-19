import { CreateCategoryForm } from "@/components/forms/create-category-form";
import { Page, PageHeader } from "@/components/page-layout/page";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Categoria | Catalogar",
};

export default function NewCategory() {
  return (
    <Page>
      <PageHeader
        title="Categorias"
        description="The king, seeing how much happier his subjects were,
            realized the error of his ways and repealed the joke tax."
      />

      <Section>
        <SectionHeader
          title="Nova categoria"
          description="This is how others will see you on the site."
        />

        <SectionContent>
          <CreateCategoryForm />
        </SectionContent>
      </Section>
    </Page>
  );
}
