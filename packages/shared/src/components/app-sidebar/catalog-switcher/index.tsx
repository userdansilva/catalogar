import { redirect, RedirectType } from "next/navigation";
import { CatalogSwitcherClient } from "./client";
import { DefaultApiError } from "@catalogar/shared/default-api-error";
import { getAuthHeaders } from "@catalogar/shared/get-auth-headers";
import { getUser } from "@catalogar/shared/get-user";

export async function CatalogSwitcher() {
  const headers = await getAuthHeaders();

  const [error, data] = await getUser({
    headers,
  });

  if (error) {
    return <DefaultApiError error={error} />;
  }

  const user = data.data;

  if (!user.currentCatalog) {
    return redirect("/dashboard/primeiro-catalogo", RedirectType.replace);
  }

  return (
    <CatalogSwitcherClient
      catalogs={user.catalogs}
      currentCatalog={user.currentCatalog}
    />
  );
}
