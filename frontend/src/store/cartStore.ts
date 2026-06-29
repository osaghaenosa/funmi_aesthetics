import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: () => number;
  totalNaira: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, qty = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product._id === product._id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.product._id === product._id ? { ...i, qty: i.qty + qty } : i
            ),
          });
        } else {
          set({ items: [...items, { product, qty }] });
        }
        set({ isOpen: true });
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.product._id !== productId) }),

      updateQty: (productId, qty) => {
        if (qty <= 0) return get().removeItem(productId);
        set({ items: get().items.map((i) => (i.product._id === productId ? { ...i, qty } : i)) });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      total: () => get().items.reduce((acc, i) => acc + i.product.price * i.qty, 0),
      totalNaira: () => get().items.reduce((acc, i) => acc + i.product.priceNaira * i.qty, 0),
      itemCount: () => get().items.reduce((acc, i) => acc + i.qty, 0),
    }),
    { name: 'funmis-cart' }
  )
);
