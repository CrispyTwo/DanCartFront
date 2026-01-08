import { useCartContext } from "@/src/features/cart/context/cart-context";
import { useCart } from "@/src/features/cart/hooks/use-cart";
import { useProxy } from "@/src/hooks/use-api";
import { CartItem, ShoppingCart } from "@/src/types/cart.types";
import { useState, useEffect } from "react";
import { useDebounce } from "@/src/hooks/use-debounce";

export default function useAlterCart() {
  const { shoppingCart, loading, setShoppingCart, refreshCart } = useCartContext();
  const { removeItem, clearCart } = useCart();
  const api = useProxy();

  const [pendingUpdates, setPendingUpdates] = useState<{ [key: string]: { item: CartItem, qty: number } }>({});
  const debouncedUpdates = useDebounce(pendingUpdates, 500);

  useEffect(() => {
    const syncUpdates = async () => {
      const updates = Object.values(debouncedUpdates);
      if (updates.length === 0) return;

      const promises = updates.map(async ({ item, qty }) => {
        try {
          await api.post("/cart", 1, JSON.stringify({
            productId: item.product.id,
            quantity: qty,
            variant: { color: item.color, size: item.size }
          }));
        } catch (err) {
          console.error("Failed to sync qty:", err);
        }
      });

      await Promise.all(promises);
      setPendingUpdates({});
    };

    void syncUpdates();
  }, [debouncedUpdates, api]);

  const updateQuantity = (targetItem: CartItem, newQty: number) => {
    if (newQty < 1) return;

    setShoppingCart((prevCart: ShoppingCart | null) => {
      if (!prevCart) return null;

      const updatedItems = prevCart.items.map((item) =>
        item.product.id === targetItem.product.id &&
          item.color === targetItem.color &&
          item.size === targetItem.size
          ? { ...item, quantity: newQty }
          : item
      );

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { ...prevCart, items: updatedItems, total: newTotal };
    });

    const key = `${targetItem.product.id}-${targetItem.color}-${targetItem.size}`;
    setPendingUpdates(prev => ({
      ...prev,
      [key]: { item: targetItem, qty: newQty }
    }));
  };

  return { shoppingCart, loading, updateQuantity, removeItem, clearCart }
}