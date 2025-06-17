import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { ExternalLink, Forward, Menu } from "lucide-react";
import { Company, Logo } from "@/types/api-types";
import {
  Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/shadcn/components/ui/drawer";
import { Button } from "./inputs/button";

export function CatalogLayout({
  children,
  primaryColor,
  secondaryColor,
  baseUrl,
  logo,
  company,
}: PropsWithChildren<{
  company: Company
  primaryColor: string;
  secondaryColor: string;
  logo: Logo;
  baseUrl: string;
}>) {
  return (
    <div>
      <header
        className="w-full border-b border-slate-100 py-4"
        style={{
          background: primaryColor,
          color: secondaryColor,
        }}

      >
        <div className="container">
          <div className="relative flex h-7 w-full items-center justify-between">
            <Link href={baseUrl}>
              <Image
                src={logo.url}
                alt="logo"
                height={logo.height}
                width={logo.width}
                style={{ height: 28, width: "auto" }}
              />
            </Link>

            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className="shadow-none"
                  style={{
                    background: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  <Menu />
                  Menu
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-xl text-center">
                  <DrawerHeader>
                    <DrawerTitle className="text-balance text-center text-4xl font-extrabold tracking-tight underline underline-offset-4">
                      {company.name}
                    </DrawerTitle>
                    {company.mainSiteUrl && (
                      <Button variant="link">
                        <a href={company.mainSiteUrl}>
                          {company.mainSiteUrl}
                        </a>
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
                    <Button
                      asChild
                      style={{
                        background: secondaryColor,
                        color: primaryColor,
                      }}
                    >
                      <a href="/">
                        <Forward />
                        Compartilhar Catálogo
                      </a>
                    </Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      <main className="container pb-10 pt-6">
        {children}
      </main>
    </div>
  );
}
