import { Prisma } from "@/generated/prisma/client";
import { StoreTopbar } from "./store-topbar";
import { PropsWithChildren } from "react";

type StoreHomeLayoutProps = PropsWithChildren<{
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

export function StoreHomeLayout({
  children,
  catalog,
  basePath,
}: StoreHomeLayoutProps) {
  return (
    <div>
      <StoreTopbar catalog={catalog} basePath={basePath} />
      <main className="container pt-6 pb-24">{children}</main>
    </div>
  );
}
