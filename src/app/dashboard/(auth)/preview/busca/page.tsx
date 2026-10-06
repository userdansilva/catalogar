import { StoreQueryFilter } from "@/components/filters/store-query-filter";
import { StoreCategoryLinks } from "@/components/store-category-links";
import { StoreProductTypeLinks } from "@/components/store-product-type-links";
import { routes } from "@/routes";
import { getPreviewCatalog } from "@/services/get-preview-catalog";
import { getSession } from "@/utils/get-session";

export const instant = false;

type PageProps = {
  searchParams: Promise<{
    p?: string;
    busca?: string;
    categoria?: string;
    produto?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  const { busca } = await searchParams;

  const query = busca || "";

  return (
    <div className="space-y-6 md:container">
      <div className="flex flex-col space-y-6">
        <div className="w-full self-center sm:w-2/3">
          <StoreQueryFilter
            currentQuery={query}
            sendTo={routes.preview.url}
            autoFocus
          />
        </div>

        <StoreCategoryLinks categories={catalog.categories} />

        <StoreProductTypeLinks productTypes={catalog.productTypes} />
      </div>
    </div>
  );
}
