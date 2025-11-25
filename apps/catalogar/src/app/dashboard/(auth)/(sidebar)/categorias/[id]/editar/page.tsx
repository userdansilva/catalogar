import { Metadata } from "next";
import { UpdateCategoryForm } from "@/components/forms/update-category-form";
import { routes } from "@/routes";
import { getCategory } from "@/services/get-category";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: routes.categories.sub.edit.title,
};

export default async function EditCategory({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const [error, data] = await getCategory(id);

  if (error) {
    return <ExpectedError error={error} />;
  }

  const category = data.data;

  return (
    <div className="space-y-6">
      <PrevButton url={routes.categories.url} />

      <PageHeader
        title={category.name}
        description="Altere os dados e clique em salvar alterações!"
      />

      <UpdateCategoryForm category={category} />
    </div>
  );
}
