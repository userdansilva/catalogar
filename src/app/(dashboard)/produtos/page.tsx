import { Button } from "@/components/inputs/button";
import { Page, PageHeader } from "@/components/page-layout/page";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { ProductsTable } from "@/components/tables/products";
import { ProductsSkeleton } from "@/components/tables/products/skeleton";
import { routes } from "@/routes";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Produtos | Catalogar",
};

type ProductsProps = {
  searchParams?: Promise<{
    page?: string;
  }>
}

export default async function Products(props: ProductsProps) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Page>
      <PageHeader
        title="Produtos"
        description="The king, seeing how much happier his subjects were,
            realized the error of his ways and repealed the joke tax."
      />

      <Section>
        <SectionHeader
          title="Meus produtos"
          description="This is how others will see you on the site."
        />

        <SectionContent>
          <Button asChild className="mb-10">
            <Link href={routes.product.new}>
              <Plus className="size-4" />
              Criar produto
            </Link>
          </Button>

          <Suspense key={currentPage} fallback={<ProductsSkeleton />}>
            <ProductsTable
              currentPage={currentPage}
            />
          </Suspense>
        </SectionContent>
      </Section>
    </Page>
  );
}
