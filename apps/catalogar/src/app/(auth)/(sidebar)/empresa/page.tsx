import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { UpdateCompanyForm } from "@/components/forms/update-company-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/components/error-handling/expected-error";

export const metadata: Metadata = {
  title: routes.company.title,
};

export default async function Company({
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

  if (!currentCatalog.company) {
    redirect(routes.company.sub.new.url, RedirectType.replace);
  }

  const { callbackUrl } = await searchParams;

  return (
    <UpdateCompanyForm
      company={currentCatalog.company}
      callbackUrl={callbackUrl}
    />
  );
}
