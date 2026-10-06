import type { PropsWithChildren } from "react";
import { getSession } from "@/utils/get-session";
import { getPreviewCatalog } from "@/services/get-preview-catalog";
import { StoreDetailLayout } from "@/components/(store)/layout/store-detail-layout";
import { routes } from "@/routes";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  return (
    <StoreDetailLayout catalog={catalog} basePath={routes.preview.url}>
      {children}
    </StoreDetailLayout>
  );
}
