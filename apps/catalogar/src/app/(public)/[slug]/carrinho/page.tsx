import { Button } from "@catalogar/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
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
    <div className="max-w-7xl space-y-6 md:container">
      <PrevButton fallbackUrl={routes.public.url(slug)} />

      <h1 className="font-semibold text-2xl">Carrinho (2)</h1>

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

              <CardContent className="px-4 space-y-3">
                <div>
                  <PriceDisplay price={123.45} />
                  <p className="text-sm">Quantidade: 1</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Button size="icon-sm" variant="outline">
                    <Minus />
                  </Button>
                  <div className="mx-1">2</div>
                  <Button size="icon-sm" variant="outline">
                    <Plus />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 flex flex-row items-end justify-between inset-x-0 p-4 pt-2 border-t">
        <div>
          <span className="text-xs">Total</span>
          <PriceDisplay price={123.45} />
        </div>
        <Button size="lg" asChild>
          <Link href={routes.public.sub.cartSummary.url(slug)}>
            Continuar (2)
          </Link>
        </Button>
      </div>
    </div>
  );
}
