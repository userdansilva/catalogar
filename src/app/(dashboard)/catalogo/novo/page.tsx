import { Metadata } from "next";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { getProductTypes } from "@/services/get-product-types";
import { getCategories } from "@/services/get-categories";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.new.title,
};

export default async function NewCatalogItem({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;

  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();

  return (
    <Section>
      <SectionHeader
        title="Novo item"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <CreateCatalogItemForm
          productTypes={productTypes}
          categories={categories}
          callbackUrl={callbackUrl}
        />
      </SectionContent>
    </Section>
  );
}
