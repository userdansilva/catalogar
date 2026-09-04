"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ExternalLink, Info, Share2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { ShareButton } from "../inputs/share-button";
import { CartButton } from "./cart-button";
import { Button, buttonVariants } from "../ui/button";
import whatsapp from "@/assets/images/whatsapp.svg";

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
        <div className="container flex h-18 flex-row items-center gap-2">
          <div className="flex flex-1 flex-row items-center">
            {theme?.logo && (
              <Link
                href={
                  isPreview ? routes.preview.url : routes.public.url(slug || "")
                }
                className="relative mr-3 size-16"
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
                className="text-lg font-semibold"
                href={
                  isPreview ? routes.preview.url : routes.public.url(slug || "")
                }
              >
                {company?.name ?? "Nome da Loja"}
              </Link>
              {company?.slogan && (
                <div className="line-clamp-2 text-xs leading-tight">
                  {company.slogan}
                </div>
              )}
            </div>
          </div>

          <div className="space-x-2">
            <Drawer>
              <DrawerTrigger
                render={
                  <Button
                    className="shadow-none"
                    style={{
                      background: theme?.primaryColor || "var(--foreground)",
                      color: theme?.secondaryColor || "var(--background)",
                    }}
                  />
                }
              >
                <Info />
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
                <div>
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
                </div>
                <DrawerFooter className="mt-8">
                  {company?.phoneNumber && (
                    <a
                      href={`https://wa.me/55${company.phoneNumber.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener"
                      className={buttonVariants({
                        size: "lg",
                        className: "bg-[#25D366] text-white hover:bg-[#53ee8c]",
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
                  <ShareButton className="bg-black text-white hover:bg-neutral-800">
                    <Share2 />
                    Compartilhar Catálogo
                  </ShareButton>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            {catalog.isCartEnabled &&
              (isPreview ? (
                <AlertDialog>
                  <AlertDialogTrigger
                    render={
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
                    }
                  />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Aviso!</AlertDialogTitle>
                      <AlertDialogDescription>
                        Carrinho não funciona no modo preview!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Fechar</AlertDialogCancel>
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
