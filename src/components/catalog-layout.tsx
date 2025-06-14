import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/types/api-types";
import { Button } from "./inputs/button";

export function CatalogLayout({
  children,
  primaryColor,
  secondaryColor,
  baseUrl,
  logo,
}: PropsWithChildren<{
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
          </div>
        </div>
      </header>

      <main className="container py-10">
        {children}
      </main>
    </div>
  );
}
