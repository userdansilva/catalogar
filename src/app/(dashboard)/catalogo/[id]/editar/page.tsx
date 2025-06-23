import { UpdateCatalogItemForm } from "@/components/forms/update-catalog-item-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getCatalogItemById } from "@/services/get-catalog-item-by-id";
import { getCategories } from "@/services/get-categories";
import { getProductTypes } from "@/services/get-product-types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.catalogItems.sub.edit.title,
};

export default async function EditCatalogItem({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params;

  const { data: catalogItem } = await getCatalogItemById(id);
  const { data: productTypes } = await getProductTypes();
  const { data: categories } = await getCategories();

  return (
    <Section>
      <SectionHeader
        title="Editar Item"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <UpdateCatalogItemForm
          catalogItem={catalogItem}
          productTypes={productTypes}
          categories={categories}
        />
      </SectionContent>
    </Section>
  );
}
