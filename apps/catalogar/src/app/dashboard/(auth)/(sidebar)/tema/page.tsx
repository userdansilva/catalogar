import type { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { UpdateThemeForm } from "@/components/forms/update-theme-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/components/error-handling/expected-error";

export const metadata: Metadata = {
  title: routes.theme.title,
};

export default async function Theme({
  searchParams,
}: {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}) {
  const [error, data] = await getUser();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const currentCatalog = data.data.currentCatalog;

  if (!currentCatalog) {
    redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  if (!currentCatalog.theme) {
    return redirect(routes.theme.sub.new.url, RedirectType.replace);
  }

  const { callbackUrl } = await searchParams;

  return (
    <UpdateThemeForm
      theme={currentCatalog.theme}
      company={currentCatalog.company}
      callbackUrl={callbackUrl}
    />
  );
}
