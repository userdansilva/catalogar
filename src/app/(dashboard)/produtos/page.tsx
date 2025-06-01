import { Button } from "@/components/inputs/button";
import { Section, SectionContent, SectionHeader } from "@/components/page-layout/section";
import { ProductTypesTable } from "@/components/tables/product-types";
import { ProductTypesSkeleton } from "@/components/tables/product-types/skeleton";
import { routes } from "@/routes";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: routes.productTypes.title,
};

type ProductTypesProps = {
  searchParams?: Promise<{
    page?: string;
  }>
}

export default async function ProductTypes(props: ProductTypesProps) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Section>
      <SectionHeader
        title="Meus produtos"
        description="This is how others will see you on the site."
      />

      <SectionContent>
        <Button asChild className="mb-10">
          <Link href={routes.productTypes.sub.new.url}>
            <Plus className="size-4" />
            Criar produto
          </Link>
        </Button>

        <Suspense key={currentPage} fallback={<ProductTypesSkeleton />}>
          <ProductTypesTable
            currentPage={currentPage}
          />
        </Suspense>
      </SectionContent>
    </Section>
  );
}
