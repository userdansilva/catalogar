import { Prisma } from "@/generated/prisma/client";
import { PropsWithChildren } from "react";
import { StoreTopbarPrev } from "./store-topbar";

type StoreCartLayoutProps = PropsWithChildren<{
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
}>;

export function StoreCartLayout({
  children,
  catalog,
  basePath,
}: StoreCartLayoutProps) {
  return (
    <div>
      <StoreTopbarPrev catalog={catalog} title="Carrinho" basePath={basePath} />
      <main className="container pt-4 pb-24">{children}</main>
    </div>
  );
}
