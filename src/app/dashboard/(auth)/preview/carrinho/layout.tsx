import type { PropsWithChildren } from "react";
import { StoreCartLayout } from "@/components/(store)/layout/store-cart-layout";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";
import { getPreviewCatalog } from "@/services/get-preview-catalog";

export const instant = false;

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  return (
    <StoreCartLayout catalog={catalog} basePath={routes.preview.url}>
      {children}
    </StoreCartLayout>
  );
}
