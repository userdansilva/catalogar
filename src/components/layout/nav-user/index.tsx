import { getSession } from "@/utils/get-session";
import { NavUserClient } from "./client";

export async function NavUser() {
  const session = await getSession();

  return <NavUserClient user={session.user} />;
}
