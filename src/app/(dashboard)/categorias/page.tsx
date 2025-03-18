import { Button } from "@/components/inputs/button";
import { Page, PageHeader } from "@/components/page-layout/page";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { CategoriesTable } from "@/components/tables/categories";
import { CategoriesSkeleton } from "@/components/tables/categories/skeleton";
import { routes } from "@/routes";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Categorias | Catalogar",
};

type CategoriesProps = {
  searchParams?: Promise<{
    q?: string;
    page?: string;
  }>
}

export default async function Categories(props: CategoriesProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Page>
      <PageHeader
        title="Categorias"
        description="The king, seeing how much happier his subjects were, 
            realized the error of his ways and repealed the joke tax."
      />

      <Section>
        <SectionHeader
          title="Minhas categorias"
          description="This is how others will see you on the site."
        />

        <SectionContent>
          <Button asChild className="mb-10">
            <Link href={routes.category.new}>
              <Plus className="size-4" />
              Criar categoria
            </Link>
          </Button>

          <Suspense key={query + currentPage} fallback={<CategoriesSkeleton />}>
            <CategoriesTable
              query={query}
              currentPage={currentPage}
            />
          </Suspense>
        </SectionContent>
      </Section>
    </Page>
  )
}
