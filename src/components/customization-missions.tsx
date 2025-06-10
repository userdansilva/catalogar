import { UserWithCatalog } from "@/types/api-types";
import { routes } from "@/routes";
import { Mission } from "./mission";

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
        Personalização
      </h2>

      <Mission
        title="1. Adicione informações da empresa"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        et ligula sit amet est blandit molestie et in purus. Donec vitae convallis
        libero, ac fermentum magna. Aenean vitae pharetra dolor. Proin nec."
        status={companyMissionStatus}
        href={routes.company.sub.new.url}
      />

      <Mission
        title="2. Adicione tema da empresa"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        et ligula sit amet est blandit molestie et in purus. Donec vitae convallis
        libero, ac fermentum magna. Aenean vitae pharetra dolor. Proin nec."
        status={themeMissionStatus}
        href={routes.theme.sub.new.url}
      />
    </div>
  );
}
