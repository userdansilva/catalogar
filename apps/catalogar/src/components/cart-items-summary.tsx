"use client";

import { Button } from "@catalogar/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import Image from "next/image";
import Link from "next/link";
import type { Company, Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { PriceDisplay } from "./catalog/price-display";
import { TitleDisplay } from "./catalog/title-display";
import { useCartStore } from "./providers/cart-store-provider";

type CatalogItemRaw = Prisma.CatalogItemGetPayload<{
  include: {
    images: true;
    productType: true;
  };
}>;

export function CartItemsSummary({
  slug,
  catalogItems,
  company,
}: {
  slug: string;
  catalogItems: (Omit<CatalogItemRaw, "price"> & {
    price: string | null;
  })[];
  company: Company;
}) {
  const { items } = useCartStore((state) => state);

  const selectedCatalogItems = items.map((item) => {
    const catalogItem = catalogItems.find(
      (ci) => Number(ci.reference) === item.reference,
    );
    return { ...item, ...catalogItem };
  });

  const total = selectedCatalogItems.reduce(
    (acc, item) => acc + Number(item.price ?? 0) * item.amount,
    0,
  );

  const whatsappUrl = company.phoneNumber
    ? `https://wa.me/${company.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Olá! Tudo bem? Gostaria de finalizar meu pedido:\n\n${selectedCatalogItems
          .map(
            (item) =>
              `*[${item.productType?.name}] ${item.title}*\nQtd: ${item.amount} | ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(item.price ?? 0))}`,
          )
          .join("\n\n")}\n\n*Total: ${new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(total))}* ✅`,
      )}`
    : undefined;

  return (
    <>
      <div className="flex flex-col gap-2">
        {selectedCatalogItems.map((catalogItem) => (
          <Card
            className="flex flex-row gap-0 py-0 shadow-none overflow-hidden"
            key={catalogItem.id}
          >
            <Link href={`${routes.public.url(slug)}/${catalogItem.reference}`}>
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

              <CardContent className="px-4">
                <PriceDisplay price={catalogItem.price || ""} />
                <p className="text-sm">Quantidade: {catalogItem.amount}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="font-semibold text-2xl">Vendedor</h2>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
          {company.description && (
            <CardDescription>{company.description}</CardDescription>
          )}
          {company.mainSiteUrl && (
            <a
              href={company.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-1"
            >
              {company.mainSiteUrl}
            </a>
          )}
        </CardHeader>
      </Card>

      <div className="fixed bottom-0 flex flex-row items-end justify-between inset-x-0 p-4 pt-2 border-t z-10 bg-background">
        <div>
          <span className="text-xs">Total</span>
          <PriceDisplay price={String(total)} />
        </div>
        <Button size="lg" asChild>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Finalizar no Whatsapp
          </a>
        </Button>
      </div>
    </>
  );
}
