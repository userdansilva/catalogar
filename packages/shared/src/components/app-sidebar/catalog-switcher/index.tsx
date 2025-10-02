import { redirect, RedirectType } from "next/navigation";
import { CatalogSwitcherClient } from "./client";
import { DefaultApiError } from "@catalogar/shared/components/error-handling/default-api-error";
import { getAuthHeaders } from "@catalogar/shared/utils/get-auth-headers";
import { getUser } from "@catalogar/shared/services/get-user";

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
