import { Metadata } from "next";
import { UpdateCategoryForm } from "@/components/forms/update-category-form";
import { routes } from "@/routes";
import { getCategoryById } from "@/services/get-category-by-id";
import { ExpectedError } from "@/components/error-handling/expected-error";

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

  const [error, data] = await getCategoryById(id);

  if (error) {
    return <ExpectedError error={error} />;
  }

  return <UpdateCategoryForm category={data.data} />;
}
