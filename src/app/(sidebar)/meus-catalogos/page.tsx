import { MyCatalogs } from "@/components/my-catalogs";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.company.title,
};

export default async function Page() {
  const { data: user } = await getUser();

  return (
    <MyCatalogs catalogs={user.catalogs} currentCatalog={user.currentCatalog} />
  );
}
