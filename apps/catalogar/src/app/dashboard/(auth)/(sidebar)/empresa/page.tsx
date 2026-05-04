import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { UpdateCompanyForm } from "@/components/forms/update-company-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

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
  const user = await getUser();

  if (!user.currentCatalog.company) {
    redirect(routes.company.sub.new.url, RedirectType.replace);
  }

  const { callbackUrl } = await searchParams;

  return (
    <UpdateCompanyForm
      company={user.currentCatalog.company}
      callbackUrl={callbackUrl}
    />
  );
}
