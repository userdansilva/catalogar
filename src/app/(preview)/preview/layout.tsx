import { CatalogLayout } from "@/components/catalog-layout";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { PropsWithChildren, ReactNode } from "react";

export default async function PreviewLayout({
  children,
  drawerdialog,
}: PropsWithChildren<{
  drawerdialog: ReactNode // Slot
}>) {
  const { data: user } = await getUser();

  const { company, theme } = user.currentCatalog;

  if (!theme || !company) return null;

  return (
    <CatalogLayout
      baseUrl={routes.preview.url}
      company={company}
      theme={theme}
    >
      {children}
      {drawerdialog}
    </CatalogLayout>
  );
}
