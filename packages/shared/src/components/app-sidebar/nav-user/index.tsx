import { redirect, RedirectType } from "next/navigation";
import { NavUserClient } from "./client";
import { DefaultApiError } from "@catalogar/shared/components/error-handling/default-api-error";
import { getUser } from "@catalogar/shared/services/get-user";
import { route } from "@catalogar/shared/route";
import { getAuthHeaders } from "@catalogar/shared/utils/get-auth-headers";

export async function NavUser() {
  const headers = await getAuthHeaders();

  const [userError, userData] = await getUser({
    headers,
  });

  if (userError) {
    return <DefaultApiError error={userError} />;
  }

  if (!userData.data.currentCatalog) {
    return redirect(route.catalog.sub.createFirst.url, RedirectType.replace);
  }

  return <NavUserClient user={userData.data} />;
}
