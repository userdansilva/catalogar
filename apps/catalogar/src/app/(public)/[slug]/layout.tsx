import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import { getPublicCatalog } from "@/services/get-public-catalog";

const ASCIIforAt = "%40"; // @

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug: fullSlug } = await params;

  if (!fullSlug.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = fullSlug.replace(ASCIIforAt, "");

  const { catalog } = await getPublicCatalog(slug);

  if (!catalog.company || !catalog.theme) {
    throw new Error("Company or theme not found for catalog");
  }

  return <CatalogLayout catalog={catalog}>{children}</CatalogLayout>;
}
