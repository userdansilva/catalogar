import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { CreateCatalogForm } from "@/components/forms/create-catalog-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/components/error-handling/expected-error";

export const metadata: Metadata = {
  title: routes.catalog.sub.createFirst.title,
};

export default async function FirstCatalog() {
  const [error, data] = await getUser();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const user = data.data;

  if (user.currentCatalog) {
    return redirect(routes.dashboard.url, RedirectType.replace);
  }

  return (
    <div className="max-w-lg space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Boas Vindas ao{" "}
          <span className="font-bold underline underline-offset-2">
            Catalogar
          </span>
        </h2>

        <p className="text-muted-foreground">
          Obrigado por se cadastrar! Você deu um grande passo para melhorar a
          experiência de escolha para seus clientes. Que tal começar criando seu
          primeiro catálogo?
        </p>
      </div>

      <CreateCatalogForm />
    </div>
  );
}
