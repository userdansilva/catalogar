import { CarouselImages } from "@/components/catalog/carousel-images";
import { Button } from "@/components/inputs/button";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getUser } from "@/services/get-user";
import { Badge } from "@/shadcn/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/shadcn/components/ui/scroll-area";
import { filterCatalogItems } from "@/utils/filter-catalog-items";
import { paginate } from "@/utils/paginate";
import { Forward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ reference: string }>
}) {
  const { data: user } = await getUser();

  const { reference } = await params;
  const { data: catalogItems } = await getCatalogItems();

  const catalogItem = catalogItems
    .find((item) => item.reference === Number(reference));

  if (!catalogItem) return null;

  const relatedCatalogItems = filterCatalogItems(catalogItems, {
    query: `${catalogItem.categories.map((category) => category.name).toString()}, ${catalogItem.productType.name}`,
  }, {
    hideIfProductTypeIsDisabled: true,
  });

  const paginatedCatalogItems = paginate(relatedCatalogItems, {
    perPage: 6,
    currentPage: 1,
  });

  return (
    <div className="flex max-w-7xl flex-col space-y-10 md:container">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <CarouselImages
          images={catalogItem.images}
        />

        <div className="space-y-6 px-4 md:px-0">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
            {catalogItem.title}
          </h1>

          {catalogItem.categories.length >= 1 && (
            <div className="flex flex-wrap gap-1">
              {catalogItem.categories.map((category) => (
                <Badge
                  key={category.id}
                  style={{
                    color: category.textColor,
                    background: category.backgroundColor,
                  }}
                  className="px-1 shadow-none"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          {catalogItem.caption && (
            <p className="leading-7">
              {catalogItem.caption}
            </p>
          )}

          <Button
            asChild
            style={{
              background: user.currentCatalog.theme?.secondaryColor,
              color: user.currentCatalog.theme?.primaryColor,
            }}
          >
            <a href="/">
              <Forward />
              Compartilhar
            </a>
          </Button>

          <p className="leading-7">
            <span className="font-semibold">Produto: </span>
            {catalogItem.productType.name}
          </p>

          {user.currentCatalog.company?.mainSiteUrl && (
            <div>
              <p className="font-semibold">Contato do Vendedor</p>
              <a href="/" className="underline underline-offset-2">
                {user.currentCatalog.company.mainSiteUrl}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="px-4 font-semibold md:px-0">Relacionados</div>

        <ScrollArea className="whitespace-nowrap">
          <div className="flex gap-2 px-4 md:px-0">
            {paginatedCatalogItems.map((relatedCatalogItem) => (
              <Link key={relatedCatalogItem.id} href="/" className="w-[200px]">
                <Image
                  src={relatedCatalogItem.images[0].url}
                  width={200}
                  height={200}
                  alt="Mockup"
                  unoptimized
                  className="overflow-hidden"
                />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
