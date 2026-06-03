import { Button } from "@catalogar/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@catalogar/ui/components/drawer";
import { ScrollArea, ScrollBar } from "@catalogar/ui/components/scroll-area";
import {
  ExternalLink,
  MessageCircleMore,
  Share2,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import whatsapp from "@/assets/images/whatsapp.svg";
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
    price: string | null;
  };
  company?: Company;
  unoptimized?: boolean;
  relatedCatalogItems: (Omit<CatalogItemRaw, "price"> & {
    price: string | null;
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

          <div>
            <ShareButton>
              <Share2 />
              Compartilhar
            </ShareButton>
          </div>

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

          <div className="fixed bottom-0 inset-x-0 flex flex-row bg-background shadow-lg z-10 lg:relative lg:bg-transparent lg:shadow-none">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className="rounded-none bg-emerald-500 text-white lg:rounded-l-lg"
                  size="lg"
                  variant="ghost"
                >
                  <MessageCircleMore />
                  Falar com Vendedor
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle className="text-center text-4xl font-extrabold tracking-tight text-balance underline underline-offset-4 mb-2">
                  {company?.name || "Minha Empresa"}
                </DrawerTitle>
                {company?.description && (
                  <DrawerDescription className="text-center">
                    {company.description}
                  </DrawerDescription>
                )}
                <div className="flex flex-col gap-2 mb-10 mx-4">
                  {company?.mainSiteUrl && (
                    <Button variant="ghost" asChild size="lg">
                      <a
                        href={company.mainSiteUrl}
                        target="_blank"
                        rel="noopener"
                      >
                        {company.mainSiteUrl}
                        <ExternalLink />
                      </a>
                    </Button>
                  )}

                  {company?.phoneNumber && (
                    <Button className="bg-[#25D366]" asChild size="lg">
                      <a
                        href={`https://wa.me/${company.phoneNumber.replace(/\D/g, "")}`}
                      >
                        <Image
                          src={whatsapp}
                          alt="Logo WhatsApp"
                          className="size-4 fill-blue-600"
                        />
                        {company.phoneNumber}
                      </a>
                    </Button>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
            <Button className="rounded-none flex-1 lg:rounded-r-lg" size="lg">
              Adicionar
              <ShoppingCart />
            </Button>
          </div>
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
