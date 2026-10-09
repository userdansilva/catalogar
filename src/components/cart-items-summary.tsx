"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { Company, Prisma } from "@/generated/prisma/client";
import { PriceDisplay } from "./catalog/price-display";
import { TitleDisplay } from "./catalog/title-display";
import { useCartStore } from "./providers/cart-store-provider";

type CatalogItemRaw = Prisma.CatalogItemGetPayload<{
  include: {
    images: true;
    productType: true;
  };
}>;

type CartItemsSummaryProps = {
  basePath: string;
  catalogItems: (Omit<CatalogItemRaw, "price"> & {
    price: string | null;
  })[];
  company: Company;
};

export function CartItemsSummary({
  basePath,
  catalogItems,
  company,
}: CartItemsSummaryProps) {
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
    ? `https://wa.me/55${company.phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Olá! Tudo bem? Gostaria de finalizar meu pedido:\n\n${selectedCatalogItems
          .map(
            (item) =>
              `*[${item.productType?.name}] ${item.title}*\nQuantidade: ${item.amount}${item.price ? ` | ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(item.price ?? 0))}` : `${total > 0 ? "| R$ (Não definido)" : ""}`}`,
          )
          .join("\n\n")}${
          total > 0
            ? ` \n\n*Total: ${new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(total))}* ✅`
            : ""
        }`,
      )}`
    : undefined;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Resumo</h1>

      <div className="flex flex-col gap-2">
        {selectedCatalogItems.map((catalogItem) => (
          <Card
            className="flex flex-row gap-0 overflow-hidden py-0 shadow-none"
            key={catalogItem.id}
          >
            <Link href={`${basePath}/${catalogItem.reference}`}>
              <Image
                src={catalogItem.images?.[0]?.url || ""}
                alt={catalogItem.title || "Imagem no Carrinho"}
                width={180}
                height={180}
                className="aspect-square size-40 rounded-md object-contain"
              />
            </Link>

            <div className="flex-1 py-4">
              <CardHeader className="px-4">
                <CardTitle>
                  <TitleDisplay title={catalogItem.title || "Undefined"} />
                </CardTitle>
              </CardHeader>

              <CardContent className="px-4">
                {catalogItem.price && (
                  <PriceDisplay price={catalogItem.price} />
                )}
                <p className="text-sm">Quantidade: {catalogItem.amount}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold">Vendedor</h2>

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

      <div className="bg-background fixed inset-x-0 bottom-0 border-t">
        <div className="container flex min-h-18 w-full flex-row items-end justify-between px-4 pt-0 pb-4">
          <div>
            {total > 0 && (
              <>
                <span className="text-xs">Total</span>
                <PriceDisplay price={String(total)} />
              </>
            )}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
            })}
          >
            Finalizar no Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
}
