import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { PageHeader } from "@/components/layout/page-header";
import { PrevButton } from "@/components/prev-button";

export default async function CategoriesLayout({
  children,
}: PropsWithChildren) {
  const { data: categories } = await getCategories();

  if (categories.length === 0) {
    redirect(routes.categories.sub.createFirst.url);
  }

  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <PageHeader
        title={routes.categories.title}
        description="Aqui você pode ver a lista de categorias já cadastradas, adicionar, editar, desativar ou excluir."
      />

      {children}
    </div>
  );
}
