import { CatalogLayout } from "@/components/catalog-layout";
import { routes } from "@/routes";
import { getPublicCatalogBySlug } from "@/services/get-public-catalog-by-slug";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

const ASCIIforAt = "%40"; // @

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ slug: string }>
}>) {
  const { slug: fullSlug } = await params;

  if (!fullSlug.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = fullSlug.replace(ASCIIforAt, "");

  const { data: catalog } = await getPublicCatalogBySlug(slug);

  if (!catalog.theme.logo) return null;

  return (
    <CatalogLayout
      primaryColor={catalog.theme.primaryColor}
      secondaryColor={catalog.theme.secondaryColor}
      baseUrl={routes.public.url(slug)}
      logo={catalog.theme.logo}
    >
      {children}
    </CatalogLayout>
  );
}
