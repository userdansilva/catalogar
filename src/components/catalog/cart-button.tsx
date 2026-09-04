"use client";

import { buttonVariants } from "@/components/ui/button";
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
    <Link
      href={routes.public.sub.cart.url(catalog.slug ?? "")}
      className={buttonVariants({
        className: "relative shadow-none",
      })}
      style={{
        background: catalog.theme?.primaryColor || "var(--foreground)",
        color: catalog.theme?.secondaryColor || "var(--background)",
      }}
    >
      {items.length > 0 && (
        <div className="absolute top-0 -right-2 size-4 text-xs">
          {items.length}
        </div>
      )}
      <ShoppingCart />
    </Link>
  );
}
