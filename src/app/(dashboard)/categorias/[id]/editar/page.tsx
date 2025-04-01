import { UpdateCategoryForm } from "@/components/forms/update-category-form";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { getCategoryById } from "@/services/get-category-by-id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.categories.sub.edit.title,
};

type EditCategoryProps = {
  params: {
    id: string
  }
}

export default async function EditCategory(props: EditCategoryProps) {
  const { data: category } = await getCategoryById(props.params.id);

  return (
    <Section>
      <SectionHeader
        title="Editar categoria"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <UpdateCategoryForm category={category} />
      </SectionContent>
    </Section>
  );
}
