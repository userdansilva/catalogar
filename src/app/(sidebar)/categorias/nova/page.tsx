import { CreateCategoryForm } from "@/components/forms/create-category-form";
import { routes } from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.categories.sub.new.title,
};

export default async function NewCategory({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return <CreateCategoryForm callbackUrl={callbackUrl} />;
}
