import { Mission } from "./mission";
import { UserWithCatalog } from "@/types/api-types";
import { routes } from "@/routes";

export function CustomizationMissions({ user }: { user: UserWithCatalog }) {
  const companyMissionStatus = (() => {
    if (user.currentCatalog.company) return "COMPLETE";

    if (!user.currentCatalog.theme) return "CURRENT";

    return "PENDING";
  })();

  const themeMissionStatus = (() => {
    if (user.currentCatalog.theme) return "COMPLETE";

    if (companyMissionStatus === "COMPLETE") return "CURRENT";

    return "PENDING";
  })();

  return (
    <div className="space-y-3">
      <h2 className="scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0">
        Personalização
      </h2>

      <Mission
        title="1. Adicione informações da empresa"
        description="Aqui, você pode colocar o nome, slogan (se tiver) e a descrição da sua empresa.
        Além de link para contato."
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
