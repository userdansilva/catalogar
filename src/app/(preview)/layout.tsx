import { CatalogLayout } from "@/components/catalog-layout";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { PropsWithChildren } from "react";

export default async function PreviewLayout({
  children,
}: PropsWithChildren) {
  const { data: user } = await getUser();

  const primaryColor = user.currentCatalog.theme?.primaryColor || "";
  const secondaryColor = user.currentCatalog.theme?.secondaryColor || "";
  const logo = user.currentCatalog.theme?.logo;

  if (!logo) return null;

  return (
    <CatalogLayout
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      baseUrl={routes.preview.url}
      logo={logo}
    >
      {children}
    </CatalogLayout>
  );
}
