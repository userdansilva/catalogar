import type { PropsWithChildren } from "react";
import { PreviewToolsBar } from "@/components/preview-tools-bar";
import { CartStoreProvider } from "@/components/providers/cart-store-provider";
import { getSession } from "@/utils/get-session";
import { getPreviewCatalog } from "@/services/get-preview-catalog";

export default async function PreviewLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  return (
    <CartStoreProvider slug={catalog.id}>
      <PreviewToolsBar company={catalog.company} theme={catalog.theme} />

      {children}
    </CartStoreProvider>
  );
}
