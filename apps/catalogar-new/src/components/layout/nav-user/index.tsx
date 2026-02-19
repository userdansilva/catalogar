import { redirect, RedirectType } from "next/navigation";
import { NavUserClient } from "./client";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

export async function NavUser() {
  const [userError, userData] = await getUser();
  if (userError) {
    return <ExpectedError error={userError} />;
  }

  if (!userData.data.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  return <NavUserClient user={userData.data} />;
}
