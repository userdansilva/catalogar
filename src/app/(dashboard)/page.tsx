import { auth } from "@/auth";
import { Mission } from "@/components/guide/mission";
import { Reward } from "@/components/guide/reward";
import { routes } from "@/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: routes.dashboard.title,
};

export default async function Home() {
  const session = await auth();

  // eslint-disable-next-line no-console
  console.log(session);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Boas Vindas ao Calogar!
        </h1>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Estamos super felizes por ter você por aqui!
          Preparamos algumas missões pra te ajudar a configurar seu catálogo.
          Ao completar cada etapa, você já vai ter um link pronto pra compartilhar seus
          produtos com seus clientes!
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0">
          Missões Principais
        </h2>

        <Mission
          title="1. Adicionar o primeiro produto"
          status="COMPLETE"
        />
        <Mission
          title="2. Adicionar a primeira categoria"
          status="COMPLETE"
        />

        <Reward
          title="Desbloqueia o catálogo"
          isRewarded
        />

        <Mission
          title="3. Adicionar o primeiro item de catálogo"
          status="CURRENT"
        />

        <Reward
          title="Desbloqueia o preview"
        />
      </div>

      <div className="space-y-3">
        <h2 className="scroll-m-20 pb-2 text-2xl font-bold tracking-tight first:mt-0">
          Missões de Personalização
        </h2>

        <Mission
          title="1. Adicionar informações da empresa"
          status="CURRENT"
        />

        <Mission
          title="2. Adicionar tema da empresa"
          status="PENDING"
        />

        <Reward
          title="Desbloqueia o link para compartilhar"
        />
      </div>
    </div>
  );
}
