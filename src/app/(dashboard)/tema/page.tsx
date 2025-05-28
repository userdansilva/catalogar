import { UpdateThemeForm } from "@/components/forms/update-theme-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: routes.theme.title,
};

export default async function Theme({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;
  const { data: user } = await getUser();

  if (!user.currentCatalog.theme) {
    return redirect(routes.theme.sub.new.url);
  }

  return (
    <Section>
      <SectionHeader
        title="Tema"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <UpdateThemeForm
          theme={user.currentCatalog.theme}
          callbackUrl={callbackUrl}
        />
      </SectionContent>
    </Section>
  );
}
