import {
  ExternalLinkIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { CartItemLink } from "./cart-item-link";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Image from "next/image";
import whatsappBlack from "@/assets/images/whatsapp-black.svg";
import whatsappWhite from "@/assets/images/whatsapp.svg";
import { cn } from "@/lib/utils";

type NavbarProps = {
  catalog: Prisma.CatalogGetPayload<{
    include: {
      company: true;
    };
  }>;
  isPreview?: boolean;
};

export const navbarItemVariants = ({
  className,
}: { className?: string } = {}) =>
  buttonVariants({
    variant: "ghost",
    className: cn(className, "h-auto w-15 flex-col rounded-lg pt-2 pb-1"),
  });

export function Navbar({ catalog, isPreview }: NavbarProps) {
  const homeLink = isPreview
    ? routes.preview.url
    : routes.public.url(catalog.slug || "");

  const searchLink = isPreview
    ? routes.preview.sub.search.url
    : routes.public.sub.search.url(catalog.slug || "");

  const menuLink = isPreview
    ? routes.preview.sub.menu.url
    : routes.public.sub.menu.url(catalog.slug || "");

  return (
    <div className="border-input fixed inset-x-0 bottom-0 flex justify-center border-t bg-white pt-1 pb-0.5">
      <div className="flex flex-row gap-4">
        {/** Início */}
        <Link href={homeLink} className={navbarItemVariants()}>
          <HomeIcon className="size-4" />
          Início
        </Link>

        {/** Busca */}
        <Link href={searchLink} className={navbarItemVariants()}>
          <SearchIcon className="size-4" />
          Busca
        </Link>

        {/** Contato */}
        {!!(catalog.company?.phoneNumber || catalog.company?.mainSiteUrl) && (
          <Drawer>
            <DrawerTrigger className={navbarItemVariants()}>
              <Image
                src={whatsappBlack}
                alt="Logo WhatsApp"
                className="size-4"
              />
              Contato
            </DrawerTrigger>
            <DrawerContent className="mx-auto w-full max-w-xl text-center">
              <DrawerHeader>
                <DrawerTitle className="text-center text-4xl font-extrabold tracking-tight text-balance underline underline-offset-4">
                  {catalog.company.name}
                </DrawerTitle>
                {catalog.company.description && (
                  <DrawerDescription className="text-center">
                    {catalog.company.description}
                  </DrawerDescription>
                )}
              </DrawerHeader>

              <DrawerFooter className="mt-6 space-y-2">
                {catalog.company.mainSiteUrl && (
                  <a
                    target="_blank"
                    rel="noopener"
                    href={catalog.company.mainSiteUrl}
                    className={buttonVariants({
                      variant: "link",
                      className: "max-w-max self-center text-black underline",
                    })}
                  >
                    {catalog.company.mainSiteUrl}
                    <ExternalLinkIcon />
                  </a>
                )}

                {catalog.company.phoneNumber && (
                  <a
                    href={`https://wa.me/55${catalog.company.phoneNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener"
                    className={buttonVariants({
                      size: "lg",
                      className: "bg-[#25D366] text-white hover:bg-[#53ee8c]",
                    })}
                  >
                    <Image
                      src={whatsappWhite}
                      alt="Logo WhatsApp"
                      className="size-4"
                    />
                    {catalog.company.phoneNumber}
                  </a>
                )}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}

        {/** Carrinho */}
        {!!(catalog.isCartEnabled && catalog.company?.phoneNumber) &&
          (isPreview ? (
            <AlertDialog>
              <AlertDialogTrigger className={navbarItemVariants()}>
                <ShoppingCartIcon className="size-4" />
                Carrinho
              </AlertDialogTrigger>
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
            <CartItemLink catalog={catalog} />
          ))}

        {/** Menu */}
        <Link href={menuLink} className={navbarItemVariants()}>
          <MenuIcon />
          Menu
        </Link>
      </div>
    </div>
  );
}
