import type { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { UpdateCatalogForm } from "@/components/forms/update-catalog-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/components/error-handling/expected-error";

export const metadata: Metadata = {
  title: routes.config.title,
};

export default async function Settings({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const [error, data] = await getUser();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const currentCatalog = data.data.currentCatalog;

  if (!currentCatalog) {
    redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  const { callbackUrl } = await searchParams;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Catálogo</h3>

      <UpdateCatalogForm catalog={currentCatalog} callbackUrl={callbackUrl} />
    </div>
  );
}
