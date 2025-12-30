import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { MyCatalogs } from "@/components/my-catalogs";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

export const metadata: Metadata = {
  title: routes.company.title,
};

export default async function Page() {
  const [error, data] = await getUser();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const user = data.data;

  if (!user.currentCatalog) {
    redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  return (
    <MyCatalogs catalogs={user.catalogs} currentCatalog={user.currentCatalog} />
  );
}
