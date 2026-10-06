import { notFound } from "next/navigation";
import { getPublicCatalog } from "@/services/get-public-catalog";
import { Metadata } from "next";
import { StoreQueryFilter } from "@/components/filters/store-query-filter";
import { StoreCategoryLinks } from "@/components/store-category-links";
import { StoreProductTypeLinks } from "@/components/store-product-type-links";
import { routes } from "@/routes";

const ASCIIforAt = "%40"; // @

export const instant = false;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    p?: string;
    busca?: string;
    categoria?: string;
    produto?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: slugWithAt } = await params;
  const slug = slugWithAt.replace("@", "");

  try {
    const { catalog } = await getPublicCatalog(slug);

    return {
      title: `Busca - ${catalog.company?.name}`,
    };
  } catch {
    return {
      title: "Não Encontrado",
    };
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug: slugWithAt } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");
  const { catalog } = await getPublicCatalog(slug);

  if (!catalog) {
    return notFound();
  }

  const { busca } = await searchParams;

  const query = busca || "";

  return (
    <div className="space-y-6 md:container">
      <div className="flex flex-col space-y-6">
        <div className="w-full self-center sm:w-2/3">
          <StoreQueryFilter
            currentQuery={query}
            sendTo={routes.public.url(slug)}
            autoFocus
          />
        </div>

        <StoreCategoryLinks categories={catalog.categories} />

        <StoreProductTypeLinks productTypes={catalog.productTypes} />
      </div>
    </div>
  );
}
