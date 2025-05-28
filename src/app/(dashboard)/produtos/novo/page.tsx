import { Metadata } from "next";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.products.sub.new.title,
};

export default async function NewProduct({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;

  return (
    <Section>
      <SectionHeader
        title="Novo produto"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <CreateProductForm
          callbackUrl={callbackUrl}
        />
      </SectionContent>
    </Section>
  );
}
