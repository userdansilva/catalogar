import { Metadata } from "next";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.products.sub.new.title,
};

export default function NewProduct() {
  return (
    <Section>
      <SectionHeader
        title="Novo produto"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <CreateProductForm />
      </SectionContent>
    </Section>
  );
}
