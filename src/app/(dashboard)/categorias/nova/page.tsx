import { CreateCategoryForm } from "@/components/forms/create-category-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.categories.sub.new.title,
};

export default async function NewCategory({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;

  return (
    <Section>
      <SectionHeader
        title="Nova categoria"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <CreateCategoryForm
          callbackUrl={callbackUrl}
        />
      </SectionContent>
    </Section>
  );
}
