import { UpdateCompanyForm } from "@/components/forms/update-company-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: routes.company.title,
};

export default async function Company({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;
  const { data: user } = await getUser();

  if (!user.currentCatalog.company) {
    return redirect(routes.company.sub.new.url);
  }

  return (
    <Section>
      <SectionHeader
        title="Empresa"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <UpdateCompanyForm
          company={user.currentCatalog.company}
          callbackUrl={callbackUrl}
        />
      </SectionContent>
    </Section>
  );
}
