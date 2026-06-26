"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { useStore } from "zustand";

import { type CartStore, createCartStore } from "@/stores/cart-store";

export type CartStoreApi = ReturnType<typeof createCartStore>;

export const CartStoreContext = createContext<CartStoreApi | undefined>(
  undefined,
);

export interface CartStoreProviderProps {
  children: ReactNode;
  slug: string;
}

export const CartStoreProvider = ({
  children,
  slug,
}: CartStoreProviderProps) => {
  const [store] = useState(() => createCartStore({ items: [], slug }));
  return (
    <CartStoreContext.Provider value={store}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);
  if (!cartStoreContext) {
    throw new Error(`useCartStore must be used within CartStoreProvider`);
  }

  return useStore(cartStoreContext, selector);
};
