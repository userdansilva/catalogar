import { notFound } from "next/navigation";
import { CartItemsSummary } from "@/components/cart-items-summary";
import { getSession } from "@/utils/get-session";
import { getPreviewCatalog } from "@/services/get-preview-catalog";
import { routes } from "@/routes";

export const instant = false;

export default async function Page() {
  const session = await getSession();
  const { catalog } = await getPreviewCatalog(session.user.currentCatalogId);

  if (!catalog.isCartEnabled || !catalog.company?.phoneNumber) {
    notFound();
  }

  return (
    <CartItemsSummary
      basePath={routes.preview.url}
      catalogItems={catalog.catalogItems}
      company={catalog.company}
    />
  );
}
