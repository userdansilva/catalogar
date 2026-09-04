"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
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
import type { Catalog, Company, Prisma } from "@/generated/prisma/client";
import { CopyButton } from "../inputs/copy-button";
import { ShareButton } from "../inputs/share-button";
import { useCartStore } from "../providers/cart-store-provider";
import { CategoriesDisplay } from "./categories-display";
import { PriceDisplay } from "./price-display";
import { TitleDisplay } from "./title-display";
import { toast } from "../ui/toast";

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
  catalog: Catalog;
};

export function PublicCatalogItemDetail({
  baseUrl,
  catalogItem,
  company,
  unoptimized,
  relatedCatalogItems,
  catalog,
}: PublicCatalogItemDetailProps) {
  const { addItem } = useCartStore((state) => state);

  return (
    <div className="mb-10 flex flex-col space-y-10">
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
            <ShareButton className="bg-black text-white hover:bg-neutral-800">
              <Share2 />
              Compartilhar
            </ShareButton>
          </div>

          <p className="leading-7">
            <span className="text-sm font-semibold">Produto: </span>
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

          <div className="bg-background fixed inset-x-0 bottom-0 z-10 flex flex-row shadow-lg lg:relative lg:bg-transparent lg:shadow-none">
            {(company?.mainSiteUrl || company?.phoneNumber) && (
              <Drawer>
                <DrawerTrigger
                  render={
                    <Button
                      className={cn(
                        "rounded-none bg-emerald-500 text-white hover:bg-emerald-400 hover:text-white lg:rounded-l-lg",
                        !catalog.isCartEnabled && "flex-1 lg:rounded-r-lg",
                      )}
                      size="lg"
                      variant="ghost"
                    />
                  }
                >
                  <MessageCircleMore />
                  Falar com Vendedor
                </DrawerTrigger>
                <DrawerContent className="mx-auto w-full max-w-xl text-center">
                  <DrawerHeader>
                    <DrawerTitle className="text-center text-4xl font-extrabold tracking-tight text-balance underline underline-offset-4">
                      {company?.name || "Minha Empresa"}
                    </DrawerTitle>
                    {company?.description && (
                      <DrawerDescription className="text-center">
                        {company.description}
                      </DrawerDescription>
                    )}
                  </DrawerHeader>
                  {(company?.phoneNumber || company?.mainSiteUrl) && (
                    <DrawerFooter className="mt-6">
                      {company?.mainSiteUrl && (
                        <a
                          href={company.mainSiteUrl}
                          className={buttonVariants({
                            variant: "link",
                            className: "max-w-max self-center text-black",
                          })}
                        >
                          {company.mainSiteUrl}
                          <ExternalLink />
                        </a>
                      )}
                      {company.phoneNumber && (
                        <a
                          href={`https://wa.me/55${company.phoneNumber.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener"
                          className={buttonVariants({
                            size: "lg",
                            className:
                              "bg-[#25D366] text-white hover:bg-[#53ee8c]",
                          })}
                        >
                          <Image
                            src={whatsapp}
                            alt="Logo WhatsApp"
                            className="size-4"
                          />
                          {company.phoneNumber}
                        </a>
                      )}
                    </DrawerFooter>
                  )}
                </DrawerContent>
              </Drawer>
            )}

            {catalog.isCartEnabled && (
              <Button
                className="flex-1 rounded-none bg-black text-white hover:bg-neutral-800 lg:rounded-r-lg"
                size="lg"
                onClick={() => {
                  addItem(Number(catalogItem.reference));
                  toast.add({
                    type: "success",
                    description: "Adicionado ao carrinho",
                  });
                }}
              >
                Adicionar
                <ShoppingCart />
              </Button>
            )}
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
