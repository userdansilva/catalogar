import { CategoriesFilter } from "@/components/categories-filter";
import { ProductTypesFilter } from "@/components/product-types-filter";
import { QueryFilter } from "@/components/query-filter";
import { getPublicCatalogBySlug } from "@/services/get-public-catalog-by-slug";
import { notFound } from "next/navigation";
import { CatalogItems } from "@/components/catalog-items";

const ASCIIforAt = "%40"; // @
const ITEMS_PER_PAGE = 16;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    categoria?: string
    produto?: string
    q?: string
    p?: string
  }>
}) {
  const { slug: slugWithAt } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");

  const { data: catalog } = await getPublicCatalogBySlug(slug);

  const {
    q, p, categoria, produto,
  } = await searchParams;

  const query = q || "";
  const productTypeSlug = produto || "";
  const categorySlug = categoria || "";
  const currentPage = Number(p) || 1;

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full sm:w-2/3">
          <QueryFilter
            mode="preview"
            currentQuery={query}
            primaryColor={catalog.theme.primaryColor}
            secondaryColor={catalog.theme.secondaryColor}
          />
        </div>

        {catalog.productTypes.length >= 2 && (
          <ProductTypesFilter
            mode="preview"
            productTypes={catalog.productTypes}
            currentProductTypeSlug={productTypeSlug}
          />
        )}

        {catalog.categories.length >= 2 && (
          <CategoriesFilter
            mode="preview"
            categories={catalog.categories}
            currentCategorySlug={categorySlug}
          />
        )}
      </div>

      <CatalogItems
        query={query}
        catalogItems={catalog.catalogItems}
        productTypeSlug={productTypeSlug}
        categorySlug={categorySlug}
        currentPage={currentPage}
        perPage={ITEMS_PER_PAGE}
        isPublic
      />
    </div>
  );
}
