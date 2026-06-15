"use client";

import { Button } from "@catalogar/ui/components/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { useCartStore } from "../providers/cart-store-provider";

export function CartButton({
  catalog,
}: {
  catalog: Prisma.CatalogGetPayload<{
    include: {
      theme: true;
    };
  }>;
}) {
  const { items } = useCartStore((state) => state);

  return (
    <Button
      className="shadow-none relative"
      style={{
        background: catalog.theme?.primaryColor || "var(--foreground)",
        color: catalog.theme?.secondaryColor || "var(--background)",
      }}
      asChild
    >
      <Link href={routes.public.sub.cart.url(catalog.slug ?? "")}>
        {items.length > 0 && (
          <div className="size-4 text-xs absolute top-0 -right-2">
            {items.length}
          </div>
        )}
        <ShoppingCart />
      </Link>
    </Button>
  );
}
