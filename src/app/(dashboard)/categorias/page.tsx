import { Page, PageHeader } from "@/components/page-layout/page";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";

export default function Categories() {
  return (
    <Page>
      <PageHeader
        title="Categorias"
        description="The king, seeing how much happier his subjects were, 
            realized the error of his ways and repealed the joke tax."
      />

      <Section>
        <SectionHeader
          title="Minhas categorias"
          description="This is how others will see you on the site."
        />

        <SectionContent>
          ...
        </SectionContent>
      </Section>
    </Page>
  )
}
