import { UpdateCategoryForm } from "@/components/forms/update-category-form";
import { routes } from "@/routes";
import { getCategoryById } from "@/services/get-category-by-id";
import { Metadata } from "next";

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

  const { data: category } = await getCategoryById(id);

  return <UpdateCategoryForm category={category} />;
}
