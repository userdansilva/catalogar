import { UpdateCatalogForm } from "@/components/forms/update-catalog-form";
import { Page, PageHeader } from "@/components/page-layout/page";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { getUser } from "@/services/get-user";

export default async function Settings() {
  const { data: user } = await getUser();

  return (
    <Page>
      <PageHeader
        title="Configuração"
        description="The king, seeing how much happier his subjects were,
        realized the error of his ways and repealed the joke tax."
      />

      <Section>
        <SectionHeader
          title="Catálogo"
          description="This is how others will see you on the site."
        />

        <SectionContent>
          <UpdateCatalogForm
            catalog={user.currentCatalog}
          />
        </SectionContent>
      </Section>
    </Page>
  );
}
