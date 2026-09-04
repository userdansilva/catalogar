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
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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
      <h1 className="text-2xl font-semibold">Carrinho ({items.length})</h1>

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
        <div className="mb-20 flex flex-col gap-2">
          {seletedCatalogItems.map((catalogItem) => (
            <Card
              className="flex flex-row gap-0 overflow-hidden py-0 shadow-none"
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

              <div className="flex-1 py-4">
                <CardHeader className="px-4">
                  <CardTitle>
                    <TitleDisplay title={catalogItem.title || "Undefined"} />
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 px-4">
                  <PriceDisplay price={catalogItem.price || ""} />
                  <div className="flex flex-row items-center gap-2">
                    {catalogItem.amount === 1 ? (
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={<Button size="icon-sm" variant="outline" />}
                        >
                          <Minus />
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

      <div className="bg-background fixed inset-x-0 bottom-0 flex flex-row items-end justify-between border-t p-4 pt-0">
        <div>
          <span className="text-xs">Total</span>
          <PriceDisplay price={String(total)} />
        </div>
        <Link
          href={routes.public.sub.cartSummary.url(slug)}
          className={buttonVariants({
            size: "lg",
          })}
        >
          Continuar ({items.length})
        </Link>
      </div>
    </div>
  );
}
