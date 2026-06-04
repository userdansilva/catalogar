import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type CartState = {
  items: {
    reference: number;
    amount: number;
  }[];
};

export type CartActions = {
  addItem: (reference: number) => void;
  removeItem: (reference: number) => void;
  clearCart: () => void;
};

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  items: [],
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set) => ({
        ...initState,

        addItem: (reference: number) =>
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.reference === reference,
            );

            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.reference === reference
                    ? { ...item, amount: item.amount + 1 }
                    : item,
                ),
              };
            }

            return {
              items: [...state.items, { reference, amount: 1 }],
            };
          }),

        removeItem: (reference: number) =>
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.reference === reference,
            );

            if (!existingItem) {
              return state;
            }

            if (existingItem.amount > 1) {
              return {
                items: state.items.map((item) =>
                  item.reference === reference
                    ? { ...item, amount: item.amount - 1 }
                    : item,
                ),
              };
            }

            return {
              items: state.items.filter((item) => item.reference !== reference),
            };
          }),

        clearCart: () => set(() => ({ items: [] })),
      }),
      {
        name: "cart-storage",
      },
    ),
  );
};
