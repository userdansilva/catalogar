import { UpdateCategoryForm } from "@/components/forms/update-category-form";
import { Page, PageHeader } from "@/components/page-layout/page";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { getCategoryById } from "@/services/get-category-by-id";

type EditCategoryProps = {
  params: {
    id: string
  }
}

export default async function EditCategory(props: EditCategoryProps) {
  const { data: category } = await getCategoryById(props.params.id)

  return (
    <Page>
      <PageHeader
        title="Categorias"
        description="The king, seeing how much happier his subjects were, 
                realized the error of his ways and repealed the joke tax."
      />

      <Section>
        <SectionHeader
          title="Editar categoria"
          description="This is how others will see you on the site."
        />

        <SectionContent>
          <UpdateCategoryForm category={category} />
        </SectionContent>
      </Section>
    </Page>
  )
}
