import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { CreateCompanyForm } from "@/components/forms/create-company-form";
import { PrevButton } from "@/components/inputs/prev-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.company.sub.new.title,
};

export default async function RegisterCompany({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getSession();

  const company = await prisma.company.findUnique({
    where: {
      catalogId: session.user.currentCatalogId,
    },
  });

  const { callbackUrl } = await searchParams;

  if (company && !callbackUrl) {
    return redirect(routes.dashboard.url, RedirectType.replace);
  }

  return (
    <div className="max-w-lg space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Vamos cadastrar seu <span className="font-bold">Negócio</span>
        </h2>

        <p className="text-muted-foreground">
          As informações abaixo ajudam seus clientes — e futuros clientes — a
          conhecer melhor seu trabalho.
        </p>
      </div>

      <CreateCompanyForm callbackUrl={callbackUrl} />
    </div>
  );
}
