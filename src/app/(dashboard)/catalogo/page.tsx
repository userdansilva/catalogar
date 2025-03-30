import { Button } from "@/components/inputs/button";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { routes } from "@/routes";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: routes.catalogItems.title,
};

type CatalogProps = {
  searchParams?: Promise<{
    page?: string;
  }>
}

export default async function Catalog(props: CatalogProps) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Section>
      <SectionHeader
        title="Meus itens"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <Button asChild className="mb-10">
          <Link href={routes.catalogItems.sub.new.url}>
            <Plus className="size-4" />
            Criar item
          </Link>
        </Button>

        {/* key={query + currentPage} */}
        <Suspense key={currentPage} fallback={<span>Carregando...</span>}>
          ...
        </Suspense>
      </SectionContent>
    </Section>
  );
}
