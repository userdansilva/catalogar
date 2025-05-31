import { MyCatalogs } from "@/components/my-catalogs";
import { Section, SectionContent } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.company.title,
};

export default async function Page() {
  const { data: user } = await getUser();

  return (
    <Section>
      <SectionContent>
        <MyCatalogs
          catalogs={user.catalogs}
          currentCatalog={user.currentCatalog}
        />
      </SectionContent>
    </Section>
  );
}
