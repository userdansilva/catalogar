import { UpdateCatalogForm } from "@/components/forms/update-catalog-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.config.title,
};

export default async function Settings() {
  const { data: user } = await getUser();

  return (
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
  );
}
