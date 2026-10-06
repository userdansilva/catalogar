"use client";

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import type { Catalog } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { useCartStore } from "../providers/cart-store-provider";
import { navbarItemVariants } from ".";

type CartItemLinkProps = {
  catalog: Catalog;
};

export function CartItemLink({ catalog }: CartItemLinkProps) {
  const { items } = useCartStore((state) => state);

  return (
    <Link
      href={routes.public.sub.cart.url(catalog.slug ?? "")}
      className={navbarItemVariants({
        className: "relative",
      })}
    >
      {items.length > 0 && (
        <div className="absolute -top-1 left-8 flex min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 py-0.5 text-xs text-white">
          {items.length}
        </div>
      )}
      <ShoppingCartIcon className="size-4" />
      Carrinho
    </Link>
  );
}
