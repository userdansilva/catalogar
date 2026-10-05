import { Prisma } from "@/generated/prisma/client";
import { PropsWithChildren } from "react";
import { StoreTopbarPrev } from "./store-topbar";

type StoreSearchLayoutProps = PropsWithChildren<{
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

export function StoreSearchLayout({
  children,
  catalog,
  basePath,
}: StoreSearchLayoutProps) {
  return (
    <div>
      <StoreTopbarPrev catalog={catalog} title="Busca" basePath={basePath} />
      <main className="container pt-4 pb-24">{children}</main>
    </div>
  );
}
