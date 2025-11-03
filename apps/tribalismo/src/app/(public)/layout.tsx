import { PropsWithChildren } from "react";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import { getPublicCatalogBySlug } from "@/services/get-public-catalog-by-slug";
import { ExpectedError } from "@/components/error-handling/expected-error";

export default async function Layout({ children }: PropsWithChildren) {
  const [error, data] = await getPublicCatalogBySlug();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const catalog = data.data;

  return (
    <CatalogLayout
      baseUrl={process.env.NEXT_PUBLIC_BASE_URL as string}
      company={catalog.company}
      theme={catalog.theme}
    >
      {children}
    </CatalogLayout>
  );
}
