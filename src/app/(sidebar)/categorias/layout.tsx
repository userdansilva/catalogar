import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { redirect } from "next/navigation";
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
        description={routes.categories.description}
      />

      {children}
    </div>
  );
}
