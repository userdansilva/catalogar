import { CreateThemeForm } from "@/components/forms/create-theme-form";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { User } from "@/types/api-types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: routes.catalog.sub.createFirst.title,
};

export default async function RegisterCompany() {
  const { data: user } = await getUser<User>();

  if (user.currentCatalog?.theme) {
    return redirect(routes.dashboard.url);
  }

  return (
    <div className="max-w-lg space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Opa! Vamos cadastrar seu
          {" "}
          <span className="font-bold">Tema</span>
        </h2>

        <p className="text-muted-foreground">
          Agora é hora de deixar seu catálogo com a identidade da sua empresa.
          Defina as cores e adicione sua logo para que tudo fique com a cara do
          seu negócio — mais profissional, reconhecível e alinhado com a marca. Vamos lá?
        </p>
      </div>

      <CreateThemeForm />
    </div>
  );
}
