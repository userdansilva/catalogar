import { PropsWithChildren } from "react";
import { Page, PageHeader } from "@/components/page-layout/page";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { redirect } from "next/navigation";

export default async function CategoriesLayout({
  children,
}: PropsWithChildren) {
  const { data: categories } = await getCategories();

  if (categories.length === 0) {
    redirect(routes.categories.sub.createFirst.url);
  }

  return (
    <Page>
      <PageHeader
        title={routes.categories.title}
        description={routes.categories.description}
      />

      {children}
    </Page>
  );
}
