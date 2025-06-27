import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";

export default async function CategoriesLayout({
  children,
}: PropsWithChildren) {
  const { data: categories } = await getCategories();

  if (categories.length === 0) {
    redirect(routes.categories.sub.createFirst.url);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={routes.categories.title}
        description={routes.categories.description}
      />

      {children}
    </div>
  );
}
