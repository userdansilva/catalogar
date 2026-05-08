import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { CreateThemeForm } from "@/components/forms/create-theme-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

export const metadata: Metadata = {
  title: routes.theme.sub.new.title,
};

export default async function RegisterCompany({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const user = await getUser();

  const { callbackUrl } = await searchParams;

  if (user.currentCatalog.theme && !callbackUrl) {
    return redirect(routes.dashboard.url, RedirectType.replace);
  }

  return (
    <div className="max-w-lg space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Vamos criar seu <span className="font-bold">Tema</span>
        </h2>

        <p className="text-muted-foreground">
          Defina as cores e adicione sua logo.
        </p>
      </div>

      <CreateThemeForm
        company={user.currentCatalog.company}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
