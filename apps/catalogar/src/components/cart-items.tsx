"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@catalogar/ui/components/alert-dialog";
import { Button } from "@catalogar/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@catalogar/ui/components/empty";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { PriceDisplay } from "./catalog/price-display";
import { TitleDisplay } from "./catalog/title-display";
import { useCartStore } from "./providers/cart-store-provider";

type CatalogItemRaw = Prisma.CatalogItemGetPayload<{
  include: {
    images: true;
  };
}>;

export function CartItems({
  slug,
  catalogItems,
}: {
  slug: string;
  catalogItems: (Omit<CatalogItemRaw, "price"> & {
    price: string | null;
  })[];
}) {
  const { addItem, items, removeItem } = useCartStore((state) => state);

  const seletedCatalogItems = items.map((item) => {
    const catalogItem = catalogItems.find(
      (ci) => Number(ci.reference) === item.reference,
    );
    return { ...item, ...catalogItem };
  });

  const total = seletedCatalogItems.reduce(
    (acc, item) => acc + Number(item.price ?? 0) * item.amount,
    0,
  );

  return (
    <div className="space-y-6">
      <h1 className="font-semibold text-2xl">Carrinho ({items.length})</h1>

      {items.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingCart />
            </EmptyMedia>
            <EmptyTitle>Nenhum item no carrinho</EmptyTitle>
            <EmptyDescription>
              Seu carrinho está vazio. Adicione itens para continuar.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-2 mb-20">
          {seletedCatalogItems.map((catalogItem) => (
            <Card
              className="flex flex-row gap-0 py-0 shadow-none overflow-hidden"
              key={catalogItem.id}
            >
              <Link
                href={`${routes.public.url(slug)}/${catalogItem.reference}`}
              >
                <Image
                  src={catalogItem.images?.[0]?.url || ""}
                  alt={catalogItem.title || "Imagem no Carrinho"}
                  width={180}
                  height={180}
                  className="size-40"
                />
              </Link>

              <div className="py-4 flex-1">
                <CardHeader className="px-4">
                  <CardTitle>
                    <TitleDisplay title={catalogItem.title || "Undefined"} />
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-4 space-y-3">
                  <PriceDisplay price={catalogItem.price || ""} />
                  <div className="flex flex-row items-center gap-2">
                    {catalogItem.amount === 1 ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon-sm" variant="outline">
                            <Minus />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Você quer remover esse item?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {catalogItem.title} será removido do seu carrinho.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel variant="outline">
                              Não
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                removeItem(Number(catalogItem.reference));
                              }}
                            >
                              Sim
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={() => {
                          removeItem(Number(catalogItem.reference));
                        }}
                      >
                        <Minus />
                      </Button>
                    )}
                    <div className="mx-1">{catalogItem.amount}</div>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() => {
                        addItem(Number(catalogItem.reference));
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 flex flex-row items-end justify-between inset-x-0 p-4 pt-0 border-t bg-background">
        <div>
          <span className="text-xs">Total</span>
          <PriceDisplay price={String(total)} />
        </div>
        <Button size="lg" asChild>
          <Link href={routes.public.sub.cartSummary.url(slug)}>
            Continuar ({items.length})
          </Link>
        </Button>
      </div>
    </div>
  );
}
