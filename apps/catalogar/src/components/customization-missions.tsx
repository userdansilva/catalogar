import { RedirectType, redirect } from "next/navigation";
import { routes } from "@/routes";
import type { User } from "@/schemas/user";
import { Mission } from "./mission";

type CustomizationMissionsProps = {
  user: User;
};

export function CustomizationMissions({ user }: CustomizationMissionsProps) {
  if (!user.currentCatalog) {
    redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  const companyMissionStatus = (() => {
    if (user.currentCatalog.company) {
      return "COMPLETE";
    }

    if (!user.currentCatalog.company) {
      return "CURRENT";
    }

    return "PENDING";
  })();

  const themeMissionStatus = (() => {
    if (user.currentCatalog.theme) {
      return "COMPLETE";
    }

    if (!user.currentCatalog.theme && user.currentCatalog.company) {
      return "CURRENT";
    }

    return "PENDING";
  })();

  return (
    <div className="space-y-3">
      <h2 className="scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0">
        Personalização
      </h2>

      <Mission
        title="1. Adicione informações da empresa"
        description="Aqui, você pode colocar o nome e descrição da sua empresa,
        e link para contato."
        status={companyMissionStatus}
        href={routes.company.sub.new.url}
      />

      <Mission
        title="2. Adicione tema da empresa"
        description="É hora de personalizar como os visitantes vão ver o seu catálogo e sua marca!
        Crie o tema com as cores e a logo da sua empresa."
        status={themeMissionStatus}
        href={routes.theme.sub.new.url}
      />
    </div>
  );
}
