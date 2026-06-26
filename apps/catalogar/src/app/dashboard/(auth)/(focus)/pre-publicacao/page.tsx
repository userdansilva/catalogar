import { PrevButton } from "@/components/inputs/prev-button";
import { PublishRequirements } from "@/components/publish-requirements";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export default async function Page() {
  const session = await getSession();

  const currentCatalog = await prisma.catalog.findUniqueOrThrow({
    where: {
      id: session.user.currentCatalogId,
    },
    include: {
      company: true,
      theme: true,
      productTypes: true,
      catalogItems: true,
    },
  });

  return (
    <div className="max-w-xl space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Oba! Vamos publicar seu <span className="font-bold">catálogo!</span>
        </h2>

        <p className="text-muted-foreground">
          Conseguiu concluir todas as etapas? Se já tiver finalizado os itens da
          lista abaixo, é só definir o seu link customizado e publicar!
        </p>
      </div>

      <PublishRequirements currentCatalog={currentCatalog} />
    </div>
  );
}
