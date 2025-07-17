import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CreateThemeForm } from "@/components/forms/create-theme-form";
import { PrevButton } from "@/components/prev-button";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { UserWithCatalog } from "@/types/api-types";

export const metadata: Metadata = {
  title: routes.catalog.sub.createFirst.title,
};

export default async function RegisterCompany({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const { data: user } = await getUser<UserWithCatalog>();

  if (user.currentCatalog.theme) {
    return redirect(routes.dashboard.url);
  }

  return (
    <div className="max-w-lg space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Vamos criar seu <span className="font-bold">Tema</span>
        </h2>

        <p className="text-muted-foreground">
          Agora é hora de deixar seu catálogo com a identidade da sua empresa.
          Defina as cores e adicione sua logo para que tudo fique com a cara do
          seu negócio — mais profissional, reconhecível e alinhado com a marca.
          Vamos lá?
        </p>
      </div>

      <CreateThemeForm
        company={user.currentCatalog.company}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
