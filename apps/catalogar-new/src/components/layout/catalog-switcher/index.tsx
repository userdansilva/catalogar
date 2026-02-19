import { redirect, RedirectType } from "next/navigation";
import { CatalogSwitcherClient } from "./client";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

export async function CatalogSwitcher() {
  const [userError, userData] = await getUser();
  if (userError) {
    return <ExpectedError error={userError} />;
  }

  if (!userData.data.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  return (
    <CatalogSwitcherClient
      catalogs={userData.data.catalogs}
      currentCatalog={userData.data.currentCatalog}
    />
  );
}
