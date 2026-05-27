import { ScrollArea, ScrollBar } from "@catalogar/ui/components/scroll-area";
import { Forward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CarouselImages } from "@/components/catalog/carousel-images";
import type { Company, Prisma } from "@/generated/prisma/client";
import { CopyButton } from "../inputs/copy-button";
import { ShareButton } from "../inputs/share-button";
import { CategoriesDisplay } from "./categories-display";
import { PriceDisplay } from "./price-display";
import { TitleDisplay } from "./title-display";

type CatalogItemRaw = Prisma.CatalogItemGetPayload<{
  include: {
    images: true;
    categories: true;
    productType: true;
  };
}>;

type PublicCatalogItemDetailProps = {
  baseUrl: string;
  catalogItem: Omit<CatalogItemRaw, "price"> & {
    price: number | null;
  };
  company?: Company;
  unoptimized?: boolean;
  relatedCatalogItems: (Omit<CatalogItemRaw, "price"> & {
    price: number | null;
  })[];
};

export function PublicCatalogItemDetail({
  baseUrl,
  catalogItem,
  company,
  unoptimized,
  relatedCatalogItems,
}: PublicCatalogItemDetailProps) {
  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row">
        <CarouselImages images={catalogItem.images} unoptimized={unoptimized} />

        <div className="space-y-4">
          <div className="space-y-2">
            <TitleDisplay
              title={catalogItem.title}
              isDisabled={!!catalogItem.disabledAt}
              className="text-lg"
            />

            {catalogItem.categories.length > 0 && (
              <CategoriesDisplay categories={catalogItem.categories} />
            )}
          </div>

          {catalogItem.price && <PriceDisplay price={catalogItem.price} />}

          {catalogItem.caption && (
            <p className="leading-7">{catalogItem.caption}</p>
          )}

          <ShareButton>
            <Forward />
            Compartilhar
          </ShareButton>

          <p className="leading-7">
            <span className="font-semibold text-sm">Produto: </span>
            {catalogItem.productType.name}
          </p>

          <div className="flex items-center gap-2 text-sm">
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

          {company?.mainSiteUrl && (
            <div className="text-sm">
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
          <div className="font-semibold">Relacionados</div>

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
