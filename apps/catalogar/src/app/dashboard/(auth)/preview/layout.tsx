import type { PropsWithChildren } from "react";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import { PreviewToolsBar } from "@/components/preview-tools-bar";
import { CartStoreProvider } from "@/components/providers/cart-store-provider";
import prisma from "@/lib/prisma";
import { getSession } from "@/utils/get-session";

export default async function PreviewLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  const catalog = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: session.user.currentCatalogId,
    },
    include: {
      company: true,
      theme: {
        include: {
          logo: true,
        },
      },
    },
  });

  return (
    <CartStoreProvider slug={catalog.id}>
      <PreviewToolsBar company={catalog.company} theme={catalog.theme} />

      <CatalogLayout catalog={catalog} isPreview>
        {children}
      </CatalogLayout>
    </CartStoreProvider>
  );
}
