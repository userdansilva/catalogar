import { Forward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@catalogar/ui/components/scroll-area";
import { Badge } from "@catalogar/ui/components/badge";
import { ShareButton } from "../inputs/share-button";
import { CopyButton } from "../inputs/copy-button";
import { CatalogItem, Company } from "@/types/api-types";
import { CarouselImages } from "@/components/catalog/carousel-images";

export function PublicCatalogItemDetail({
  baseUrl,
  catalogItem,
  company,
  unoptimized,
  relatedCatalogItems,
}: {
  baseUrl: string;
  catalogItem: CatalogItem;
  company: Company;
  unoptimized?: boolean;
  relatedCatalogItems: CatalogItem[];
}) {
  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col gap-10 lg:flex-row">
        <CarouselImages images={catalogItem.images} unoptimized={unoptimized} />

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
            <p className="leading-7">{catalogItem.caption}</p>
          )}

          <ShareButton>
            <Forward />
            Compartilhar
          </ShareButton>

          <p className="leading-7">
            <span className="font-semibold">Produto: </span>
            {catalogItem.productType.name}
          </p>

          <div className="flex items-center gap-2">
            <p className="leading-7">
              <span className="font-semibold">Código: </span>
              {catalogItem.reference}
            </p>
            <CopyButton
              textToCopy={catalogItem.reference.toString()}
              size="sm"
              variant="outline"
            />
          </div>

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
        <div className="w-full max-w-screen space-y-4">
          <div className="px-4 font-semibold md:px-0">Relacionados</div>

          <ScrollArea className="whitespace-nowrap">
            <div className="flex gap-2 px-4 md:px-0">
              {relatedCatalogItems.map((relatedCatalogItem) => (
                <Link
                  key={relatedCatalogItem.id}
                  href={`${baseUrl}/${relatedCatalogItem.reference}`}
                  className="size-40"
                >
                  <Image
                    src={relatedCatalogItem.images[0]?.url || ""}
                    width={160}
                    height={160}
                    alt="Mockup"
                    className="overflow-hidden rounded-sm"
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
