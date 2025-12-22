import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import { routes } from "@/routes";
import { getPublicCatalogBySlug } from "@/services/get-public-catalog-by-slug";
import { ExpectedError } from "@/components/error-handling/expected-error";

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

  const [error, data] = await getPublicCatalogBySlug(slug);

  if (error) {
    return <ExpectedError error={error} />;
  }

  const catalog = data.data;

  return (
    <CatalogLayout
      baseUrl={routes.public.url(slug)}
      company={catalog.company}
      theme={catalog.theme}
    >
      {children}
    </CatalogLayout>
  );
}
