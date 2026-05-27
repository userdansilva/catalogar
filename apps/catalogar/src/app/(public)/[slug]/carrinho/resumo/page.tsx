import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@catalogar/ui/components/alert";
import { Button } from "@catalogar/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import { InfoIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { PriceDisplay } from "@/components/catalog/price-display";
import { TitleDisplay } from "@/components/catalog/title-display";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";

const ASCIIforAt = "%40"; // @

export default async function CartPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug: slugWithAt } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");

  return (
    <>
      <div className="max-w-7xl space-y-6 md:container pb-24">
        <PrevButton fallbackUrl={routes.public.url(slug)} />

        <Alert>
          <InfoIcon />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            Ao clicar em "Finalizar no Whatsapp", você será redirecionado para o
            Whatsapp do vendedor. Verifique as informações do vendedor antes de
            realizar qualquer pagamento.
          </AlertDescription>
        </Alert>

        <h1 className="font-semibold text-2xl">Resumo</h1>

        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((item) => (
            <Card className="flex flex-row gap-0 py-0 shadow-none" key={item}>
              <div className="size-40 bg-amber-100" />

              <div className="py-4 flex-1">
                <CardHeader className="px-4">
                  <CardTitle>
                    <TitleDisplay title={`Produto Exemplo ${item}`} />
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-4 ">
                  <div>
                    <PriceDisplay price={123.45} />
                    <p className="text-sm">Quantidade: 1</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <h1 className="font-semibold text-2xl">Vendedor</h1>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Empresa Exemplo LTDA</CardTitle>
            <CardDescription>
              Maior empresa de exemplo do mundo, vendendo produtos incríveis
              para você!
            </CardDescription>
            <a
              href="https://www.empresaexemplo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-1"
            >
              https://www.empresaexemplo.com
            </a>
          </CardHeader>
        </Card>
      </div>

      <div className="fixed bottom-0 flex flex-row items-end justify-between inset-x-0 p-4 pt-2 border-t z-10 bg-background">
        <div>
          <span className="text-xs">Total</span>
          <PriceDisplay price={123.45} />
        </div>
        <Button size="lg">Finalizar no Whatsapp</Button>
      </div>
    </>
  );
}
