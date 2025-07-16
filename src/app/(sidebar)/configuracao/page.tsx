import { Metadata } from "next";
import { UpdateCatalogForm } from "@/components/forms/update-catalog-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

export const metadata: Metadata = {
  title: routes.config.title,
};

export default async function Settings({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { data: user } = await getUser();
  const { callbackUrl } = await searchParams;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Catálogo</h3>

      <UpdateCatalogForm
        catalog={user.currentCatalog}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
