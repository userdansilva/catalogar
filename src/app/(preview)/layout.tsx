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
  const { company } = user.currentCatalog;

  if (!logo || !company) return null;

  return (
    <CatalogLayout
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      baseUrl={routes.preview.url}
      logo={logo}
      company={company}
    >
      {children}
    </CatalogLayout>
  );
}
