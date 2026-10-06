import type { PropsWithChildren } from "react";
import { getSession } from "@/utils/get-session";
import { getPreviewCatalog } from "@/services/get-preview-catalog";
import { routes } from "@/routes";
import { StoreHomeLayout } from "@/components/(store)/layout/store-home-layout";

export const instant = false;

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  return (
    <StoreHomeLayout catalog={catalog} basePath={routes.preview.url}>
      {children}
    </StoreHomeLayout>
  );
}
