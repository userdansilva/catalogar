import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { getPublicCatalog } from "@/services/get-public-catalog";
import { routes } from "@/routes";
import { StoreDetailLayout } from "@/components/(store)/layout/store-detail-layout";

const ASCIIforAt = "%40"; // @

export const instant = false;

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

  return (
    <StoreDetailLayout catalog={catalog} basePath={routes.public.url(slug)}>
      {children}
    </StoreDetailLayout>
  );
}
