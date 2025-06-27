import { CatalogLayout } from "@/components/catalog-layout";
import { routes } from "@/routes";
import { getPublicCatalogBySlug } from "@/services/get-public-catalog-by-slug";
import { notFound } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

const ASCIIforAt = "%40"; // @

export default async function Layout({
  children,
  params,
  drawerdialog,
}: PropsWithChildren<{
  params: Promise<{ slug: string }>
  drawerdialog: ReactNode // Slot
}>) {
  const { slug: fullSlug } = await params;

  if (!fullSlug.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = fullSlug.replace(ASCIIforAt, "");

  const { data: catalog } = await getPublicCatalogBySlug(slug);

  if (!catalog.theme) return null;

  return (
    <CatalogLayout
      baseUrl={routes.public.url(slug)}
      company={catalog.company}
      theme={catalog.theme}
    >
      {children}
      {drawerdialog}
    </CatalogLayout>
  );
}
