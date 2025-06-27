import { UpdateCatalogForm } from "@/components/forms/update-catalog-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.config.title,
};

export default async function Settings() {
  const { data: user } = await getUser();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">
          Catálogo
        </h3>

        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <UpdateCatalogForm
        catalog={user.currentCatalog}
      />
    </div>
  );
}
