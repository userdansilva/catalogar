import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";

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

  const catalog = await prisma.catalog.findFirst({
    where: {
      slug,
      publishedAt: { not: null },
    },
    include: {
      theme: {
        include: {
          logo: true,
        },
      },
      company: true,
    },
  });

  if (!catalog) {
    notFound();
  }

  return (
    <CatalogLayout
      baseUrl={routes.public.url(slug)}
      company={catalog.company}
      theme={catalog.theme}
      slug={slug}
    >
      {children}
    </CatalogLayout>
  );
}
