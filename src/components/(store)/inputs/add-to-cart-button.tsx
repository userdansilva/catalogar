"use client";

import { useCartStore } from "@/components/providers/cart-store-provider";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { ShoppingCartIcon } from "lucide-react";

export function AddToCartButton({ reference }: { reference: number }) {
  const { addItem } = useCartStore((state) => state);

  return (
    <Button
      className="flex-1 rounded-none bg-black text-white hover:bg-neutral-800 lg:max-w-48 lg:rounded-r-lg"
      size="lg"
      onClick={() => {
        addItem(reference);
        toast.add({
          type: "success",
          description: "Adicionado ao carrinho",
        });
      }}
    >
      Adicionar
      <ShoppingCartIcon />
    </Button>
  );
}
