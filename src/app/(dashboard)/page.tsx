import { auth } from "@/auth";
import { routes } from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.dashboard.title,
};

export default async function Home() {
  const session = await auth();

  // eslint-disable-next-line no-console
  console.log(session);

  return (
    <div>
      this is fine
    </div>
  );
}
