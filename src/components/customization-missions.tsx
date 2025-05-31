import { UserWithCatalog } from "@/types/api-types";
import { routes } from "@/routes";
import { Mission } from "./mission";
import { Reward } from "./reward";

export function CustomizationMissions({
  user,
}: {
  user: UserWithCatalog
}) {
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
        Missões de Personalização
      </h2>

      <Mission
        title="1. Adicionar informações da empresa"
        status={companyMissionStatus}
        href={routes.company.sub.new.url}
      />

      <Mission
        title="2. Adicionar tema da empresa"
        status={themeMissionStatus}
        href={routes.theme.sub.new.url}
      />

      <Reward
        title="Desbloqueia o link para compartilhar"
        isRewarded={themeMissionStatus === "COMPLETE"}
      />
    </div>
  );
}
