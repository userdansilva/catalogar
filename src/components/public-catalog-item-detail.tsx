import { CarouselImages } from "@/components/carousel-images";
import { Badge } from "@/shadcn/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/shadcn/components/ui/scroll-area";
import { CatalogItem, Company, Theme } from "@/types/api-types";
import { Forward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ShareButton } from "./share-button";

export function PublicCatalogItemDetail({
  baseUrl,
  catalogItem,
  theme,
  company,
  unoptimized,
  relatedCatalogItems,
}: {
  baseUrl: string
  catalogItem: CatalogItem
  theme: Theme
  company: Company
  unoptimized?: boolean
  relatedCatalogItems: CatalogItem[]
}) {
  return (
    <div className="flex flex-col space-y-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <CarouselImages
          images={catalogItem.images}
          unoptimized={unoptimized}
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

          <ShareButton
            style={{
              background: theme.secondaryColor,
              color: theme.primaryColor,
            }}
          >
            <Forward />
            Compartilhar
          </ShareButton>

          <p className="leading-7">
            <span className="font-semibold">Produto: </span>
            {catalogItem.productType.name}
          </p>

          <p className="leading-7">
            <span className="font-semibold">Código: </span>
            {catalogItem.reference}
          </p>

          {company.mainSiteUrl && (
            <div>
              <p className="font-semibold">Contato do Vendedor</p>
              <a
                href={company.mainSiteUrl}
                className="underline underline-offset-2"
                target="_blank"
              >
                {company.mainSiteUrl}
              </a>
            </div>
          )}
        </div>
      </div>

      {relatedCatalogItems.length >= 1 && (
        <div className="space-y-6">
          <div className="px-4 font-semibold md:px-0">Relacionados</div>

          <ScrollArea className="whitespace-nowrap">
            <div className="flex gap-2 px-4 md:px-0">
              {relatedCatalogItems.map((relatedCatalogItem) => (
                <Link key={relatedCatalogItem.id} href={`${baseUrl}/${relatedCatalogItem.reference}`} className="w-[200px]">
                  <Image
                    src={relatedCatalogItem.images[0].url}
                    width={200}
                    height={200}
                    alt="Mockup"
                    className="overflow-hidden"
                    unoptimized={unoptimized}
                  />
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
