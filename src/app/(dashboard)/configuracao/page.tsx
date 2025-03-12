import { UpdateCatalogForm } from "@/components/forms/update-catalog-form";
import { getUser } from "@/services/get-user";
import { Separator } from "@/shadcn/components/ui/separator";

export default async function Settings() {
  const { data: user } = await getUser();

  return (
    <div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Configuração
        </h2>

        <p className="text-muted-foreground">
          The king, seeing how much happier his subjects were, realized the error of
          his ways and repealed the joke tax.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            Catálogo
          </h3>

          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>

        <UpdateCatalogForm catalog={user.currentCatalog} />
      </div>
    </div>
  )
}
