import { getUser } from "@/services/get-user";
import { CatalogSwitcherClient } from "./client";

export async function CatalogSwitcher() {
  const user = await getUser();

  return (
    <CatalogSwitcherClient
      catalogs={user.catalogs}
      currentCatalog={user.currentCatalog}
    />
  );
}
