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
        className="w-full border-b border-slate-100 py-4"
        style={{
          background: theme?.primaryColor || "var(--foreground)",
          color: theme?.secondaryColor || "var(--background)",
        }}
      >
        <div className="container">
          <div className="relative flex h-7 w-full items-center justify-between">
            <Link
              href={
                isPreview ? routes.preview.url : routes.public.url(slug || "")
              }
            >
              {theme?.logo ? (
                <Image
                  src={theme.logo.url}
                  alt="logo"
                  height={theme.logo.height}
                  width={theme.logo.width}
                  style={{ height: 28, width: "auto" }}
                />
              ) : (
                <span className="text-2xl font-semibold">
                  {company?.name || "Minha Empresa"}
                </span>
              )}
            </Link>

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
                          <a href={company.mainSiteUrl}>
                            {company.mainSiteUrl}
                          </a>
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
                          background:
                            theme?.primaryColor || "var(--foreground)",
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
        </div>
      </header>

      <main className="container pt-6 pb-10">{children}</main>
    </div>
  );
}
