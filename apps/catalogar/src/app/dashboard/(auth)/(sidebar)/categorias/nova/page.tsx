import { Metadata } from "next";
import { CreateCategoryForm } from "@/components/forms/create-category-form";
import { routes } from "@/routes";
import { PrevButton } from "@/components/inputs/prev-button";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: routes.categories.sub.new.title,
};

export default async function NewCategory({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="space-y-6">
      <PrevButton url={routes.categories.url} />

      <PageHeader
        title={routes.categories.sub.new.title}
        description="Qual o nome da categoria que quer adicionar? E quais as cores relacionadas a ela?"
      />

      <CreateCategoryForm callbackUrl={callbackUrl} />
    </div>
  );
}
