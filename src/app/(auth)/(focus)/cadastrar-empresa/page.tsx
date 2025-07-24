import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CreateCompanyForm } from "@/components/forms/create-company-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { User } from "@/types/api-types";

export const metadata: Metadata = {
  title: routes.company.sub.new.title,
};

export default async function RegisterCompany({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const { data: user } = await getUser<User>();

  if (user.currentCatalog?.company) {
    return redirect(routes.dashboard.url);
  }

  return (
    <div className="max-w-lg space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

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
