import type { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { CreateCompanyForm } from "@/components/forms/create-company-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { ExpectedError } from "@/components/error-handling/expected-error";

export const metadata: Metadata = {
  title: routes.company.sub.new.title,
};

export default async function RegisterCompany({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const [error, data] = await getUser();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const user = data.data;

  if (!user.currentCatalog) {
    redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  const { callbackUrl } = await searchParams;

  if (user.currentCatalog.company && !callbackUrl) {
    return redirect(routes.dashboard.url, RedirectType.replace);
  }

  return (
    <div className="max-w-lg space-y-8">
      <PrevButton url={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Vamos cadastrar sua <span className="font-bold">Empresa</span>
        </h2>

        <p className="text-muted-foreground">
          As informações abaixo ajudam seus clientes — e futuros clientes — a
          conhecer melhor sua empresa. Tudo isso será exibido no seu catálogo e
          vai facilitar o contato, além de fortalecer a conexão com seu público.
          Bora começar?
        </p>
      </div>

      <CreateCompanyForm callbackUrl={callbackUrl} />
    </div>
  );
}
