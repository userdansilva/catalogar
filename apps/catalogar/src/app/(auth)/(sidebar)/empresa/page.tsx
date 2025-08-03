import { Metadata } from "next";
import { redirect } from "next/navigation";
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
  const { callbackUrl } = await searchParams;
  const { data: user } = await getUser();

  if (!user.currentCatalog.company) {
    return redirect(routes.company.sub.new.url);
  }

  return (
    <UpdateCompanyForm
      company={user.currentCatalog.company}
      callbackUrl={callbackUrl}
    />
  );
}
