import { getUser } from "@/services/get-user";
import { NavUserClient } from "./client";

export async function NavUser() {
  const user = await getUser();

  return <NavUserClient user={user} />;
}
