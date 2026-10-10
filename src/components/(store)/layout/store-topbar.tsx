import { Prisma, Theme } from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { ExternalLinkIcon, InfoIcon, Share2Icon } from "lucide-react";
import { ShareButton } from "@/components/inputs/share-button";
import { CartButton } from "@/components/catalog/cart-button";
import whatsapp from "@/assets/images/whatsapp.svg";
import { StorePrevButton } from "./store-prev-button";

type StoreTopbarContainerProps = PropsWithChildren<{
  theme: Theme | null;
}>;

function StoreTopbarContainer({ theme, children }: StoreTopbarContainerProps) {
  return (
    <header
      className="w-full border-b border-slate-100"
      style={{
        background: theme?.primaryColor || "#000000", // Black
        color: theme?.secondaryColor || "#FFFFFF", // White
      }}
    >
      <div className="container flex h-16 flex-row items-center gap-3">
        {children}
      </div>
    </header>
  );
}

type StoreTopbarProps = {
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
  basePath: string;
};

export function StoreTopbar({ catalog, basePath }: StoreTopbarProps) {
  const { company, theme } = catalog;

  return (
    <header
      className="w-full border-b border-slate-100"
      style={{
        background: theme?.primaryColor || "#000000", // Black
        color: theme?.secondaryColor || "#FFFFFF", // White
      }}
    >
      <div className="container flex h-16 flex-row items-center gap-2">
        <div className="flex flex-1 flex-row items-center">
          {theme?.logo && (
            <Link
              href={basePath}
              className="relative mr-3 flex size-14 items-center"
            >
              <Image
                src={theme.logo.url}
                alt="logo"
                width={300}
                height={300}
                className="max-h-14 object-contain"
              />
            </Link>
          )}

          <div className="flex flex-1 flex-col -space-y-0.5">
            <Link
              className="line-clamp-1 text-lg font-semibold"
              href={basePath}
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
                    background: theme?.primaryColor || "#000000", // Black
                    color: theme?.secondaryColor || "#FFFFFF", // White
                  }}
                />
              }
            >
              <InfoIcon />
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
                    <ExternalLinkIcon />
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
                  <Share2Icon />
                  Compartilhar Catálogo
                </ShareButton>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {catalog.isCartEnabled && catalog.company?.phoneNumber && (
            <CartButton catalog={catalog} basePath={basePath} />
          )}
        </div>
      </div>
    </header>
  );

  // return (
  //   <StoreTopbarContainer theme={theme}>
  //     {/* Company logo */}
  //     {theme?.logo && (
  //       <Link href={homeLink} className="relative flex size-14 items-center">
  //         <Image
  //           src={theme.logo.url}
  //           alt="logo"
  //           width={theme.logo.width}
  //           height={theme.logo.height}
  //           className="object-contain"
  //         />
  //       </Link>
  //     )}

  //     {/* Company info */}
  //     <div className="flex flex-1 flex-col -space-y-0.5">
  //       {/* Company name */}
  //       <Link className="line-clamp-1 text-lg font-semibold" href={homeLink}>
  //         {company?.name ?? "Nome da Loja"}
  //       </Link>

  //       {/* Company slogan */}
  //       {company?.slogan && (
  //         <div className="line-clamp-2 text-xs leading-tight">
  //           {company.slogan}
  //         </div>
  //       )}
  //     </div>
  //   </StoreTopbarContainer>
  // );
}

type StoreTopbarPrevProps = StoreTopbarProps & {
  title: string;
  shouldHideCartButton?: boolean;
};

export function StoreTopbarPrev({
  catalog,
  basePath,
  title,
  shouldHideCartButton,
}: StoreTopbarPrevProps) {
  return (
    <StoreTopbarContainer theme={catalog.theme}>
      <StorePrevButton fallbackUrl={basePath} theme={catalog.theme} />
      <span className="text-base font-semibold">{title}</span>

      {catalog.isCartEnabled &&
        catalog.company?.phoneNumber &&
        !shouldHideCartButton && (
          <div className="ml-auto">
            <CartButton catalog={catalog} basePath={basePath} />
          </div>
        )}
    </StoreTopbarContainer>
  );
}
