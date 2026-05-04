import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdateCategoryForm } from "@/components/forms/update-category-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";
import { routes } from "@/routes";
import { getCategory } from "@/services/get-category";

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

  const { category } = await getCategory(id);

  if (!category) {
    notFound();
  }

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
