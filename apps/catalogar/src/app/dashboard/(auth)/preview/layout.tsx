import type { PropsWithChildren } from "react";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import { PreviewToolsBar } from "@/components/preview-tools-bar";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

export default async function PreviewLayout({ children }: PropsWithChildren) {
  const user = await getUser();

  const { company, theme } = user.currentCatalog;

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
