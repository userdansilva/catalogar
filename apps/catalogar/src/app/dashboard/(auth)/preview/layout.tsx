import type { PropsWithChildren } from "react";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import { PreviewToolsBar } from "@/components/preview-tools-bar";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export default async function PreviewLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  const { company, theme } = await prisma.catalog.findUniqueOrThrow({
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
    <div>
      <PreviewToolsBar company={company} theme={theme} />

      <CatalogLayout
        baseUrl={routes.preview.url}
        company={company}
        theme={theme}
      >
        {children}
      </CatalogLayout>
    </div>
  );
}
