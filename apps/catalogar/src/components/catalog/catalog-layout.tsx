"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@catalogar/ui/components/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@catalogar/ui/components/drawer";
import { ExternalLink, Info, Share2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { Button } from "../inputs/button";
import { ShareButton } from "../inputs/share-button";
import { CartButton } from "./cart-button";

export function CatalogLayout({
  children,
  catalog,
  isPreview,
}: PropsWithChildren<{
  catalog: Prisma.CatalogGetPayload<{
    include: {
      company: true;
      theme: {
        include: {
          logo: true;
        };
      };
    };
  }>;
  isPreview?: boolean;
}>) {
  const { company, theme, slug } = catalog;

  return (
    <div>
      <header
        className="w-full border-b border-slate-100"
        style={{
          background: theme?.primaryColor || "var(--foreground)",
          color: theme?.secondaryColor || "var(--background)",
        }}
      >
        <div className="flex flex-row items-center container h-18 gap-2">
          <div className="flex items-center flex-row flex-1">
            {theme?.logo && (
              <Link
                href={
                  isPreview ? routes.preview.url : routes.public.url(slug || "")
                }
                className="size-16 relative mr-3"
              >
                <Image
                  src={theme.logo.url}
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </Link>
            )}

            <div className="flex flex-col -space-y-0.5">
              <Link
                className="font-semibold text-lg"
                href={
                  isPreview ? routes.preview.url : routes.public.url(slug || "")
                }
              >
                {company?.name ?? "Nome da Loja"}
              </Link>
              {company?.slogan && (
                <div className="text-xs leading-tight line-clamp-2">
                  {company.slogan}
                </div>
              )}
            </div>
          </div>

          <div className="space-x-2">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className="shadow-none"
                  style={{
                    background: theme?.primaryColor || "var(--foreground)",
                    color: theme?.secondaryColor || "var(--background)",
                  }}
                >
                  <Info />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-xl text-center">
                  <DrawerHeader>
                    <DrawerTitle className="text-center text-4xl font-extrabold tracking-tight text-balance underline underline-offset-4">
                      {company?.name || "Minha Empresa"}
                    </DrawerTitle>
                    {company?.mainSiteUrl && (
                      <Button variant="link">
                        <a href={company.mainSiteUrl}>{company.mainSiteUrl}</a>
                        <ExternalLink />
                      </Button>
                    )}
                    {company?.description && (
                      <DrawerDescription className="text-center">
                        {company.description}
                      </DrawerDescription>
                    )}
                  </DrawerHeader>
                  <DrawerFooter>
                    <ShareButton
                      style={{
                        background:
                          theme?.secondaryColor || "var(--background)",
                        color: theme?.primaryColor || "var(--foreground)",
                      }}
                    >
                      <Share2 />
                      Compartilhar Catálogo
                    </ShareButton>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            {catalog.isCartEnabled &&
              (isPreview ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="shadow-none"
                      style={{
                        background: theme?.primaryColor || "var(--foreground)",
                        color: theme?.secondaryColor || "var(--background)",
                      }}
                    >
                      <ShoppingCart />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Ops!</AlertDialogTitle>
                      <AlertDialogDescription>
                        Carrinho não é habilitado no modo preview.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Fechar</AlertDialogCancel>
                      <AlertDialogAction>Entendido</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <CartButton catalog={catalog} />
              ))}
          </div>
        </div>
      </header>

      <main className="container pt-6 pb-10">{children}</main>
    </div>
  );
}
