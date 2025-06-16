import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        const currentItems = get().items;
        if (!currentItems.some(item => item.id === product.id)) {
          set({ items: [...currentItems, product] });
        }
      },
      
      removeItem: (productId: string) => {
        set({
          items: get().items.filter(item => item.id !== productId),
        });
      },
      
      isInWishlist: (productId: string) => {
        return get().items.some(item => item.id === productId);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);