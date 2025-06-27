import { CreateCatalogForm } from "@/components/forms/create-catalog-form";
import { routes } from "@/routes";
import { Separator } from "@/shadcn/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.catalog.sub.create.title,
};

export default function AddCatalog() {
  return (
    <div>
      <div className="max-w-lg  space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Criar Catálogo
        </h2>

        <p className="text-muted-foreground">
          The king, seeing how much happier his subjects were, realized the error of
          his ways and repealed the joke tax.
        </p>
      </div>

      <Separator className="my-6" />

      <CreateCatalogForm />
    </div>
  );
}
