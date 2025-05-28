import { Metadata } from "next";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { CreateCatalogItemForm } from "@/components/forms/create-catalog-item-form";
import { getProducts } from "@/services/get-products";
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

  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();

  return (
    <Section>
      <SectionHeader
        title="Novo item"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <CreateCatalogItemForm
          products={products}
          categories={categories}
          callbackUrl={callbackUrl}
        />
      </SectionContent>
    </Section>
  );
}
