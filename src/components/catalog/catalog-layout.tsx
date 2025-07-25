import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { ExternalLink, Forward, Menu } from "lucide-react";
import { Button } from "../inputs/button";
import { ShareButton } from "../inputs/share-button";
import { Company, Theme } from "@/types/api-types";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shadcn/components/ui/drawer";

export function CatalogLayout({
  children,
  baseUrl,
  company,
  theme,
}: PropsWithChildren<{
  baseUrl: string;
  company: Company;
  theme: Theme;
}>) {
  return (
    <div>
      <header
        className="w-full border-b border-slate-100 py-4"
        style={{
          background: theme.primaryColor,
          color: theme.secondaryColor,
        }}
      >
        <div className="container">
          <div className="relative flex h-7 w-full items-center justify-between">
            <Link href={baseUrl}>
              {theme.logo ? (
                <Image
                  src={theme.logo.url}
                  alt="logo"
                  height={theme.logo.height}
                  width={theme.logo.width}
                  style={{ height: 28, width: "auto" }}
                />
              ) : (
                <span className="text-2xl font-semibold">{company.name}</span>
              )}
            </Link>

            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className="shadow-none"
                  style={{
                    background: theme.primaryColor,
                    color: theme.secondaryColor,
                  }}
                >
                  <Menu />
                  Menu
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-xl text-center">
                  <DrawerHeader>
                    <DrawerTitle className="text-center text-4xl font-extrabold tracking-tight text-balance underline underline-offset-4">
                      {company.name}
                    </DrawerTitle>
                    {company.mainSiteUrl && (
                      <Button variant="link">
                        <a href={company.mainSiteUrl}>{company.mainSiteUrl}</a>
                        <ExternalLink />
                      </Button>
                    )}
                    {company.description && (
                      <DrawerDescription className="text-center">
                        {company.description}
                      </DrawerDescription>
                    )}
                  </DrawerHeader>
                  <DrawerFooter>
                    <ShareButton
                      style={{
                        background: theme.secondaryColor,
                        color: theme.primaryColor,
                      }}
                    >
                      <Forward />
                      Compartilhar Catálogo
                    </ShareButton>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      <main className="container pt-6 pb-10">{children}</main>
    </div>
  );
}
