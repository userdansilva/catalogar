import { Metadata } from "next";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { CreateProductTypeForm } from "@/components/forms/create-product-type-form";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.productTypes.sub.new.title,
};

export default async function NewProductType({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;

  return (
    <Section>
      <SectionHeader
        title="Novo tipo de produto"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <CreateProductTypeForm
          callbackUrl={callbackUrl}
        />
      </SectionContent>
    </Section>
  );
}
