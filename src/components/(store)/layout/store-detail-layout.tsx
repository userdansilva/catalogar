import { Prisma } from "@/generated/prisma/client";
import { StoreTopbarPrev } from "./store-topbar";
import { PropsWithChildren } from "react";

type StoreDetailLayoutProps = PropsWithChildren<{
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

export function StoreDetailLayout({
  children,
  catalog,
  basePath,
}: StoreDetailLayoutProps) {
  return (
    <div>
      <StoreTopbarPrev catalog={catalog} title="Detalhe" basePath={basePath} />
      <main className="pb-24 md:container lg:pt-12">{children}</main>
    </div>
  );
}
