import { useCartContext } from "@/src/features/cart/context/cart-context";
import { useCart } from "@/src/features/cart/hooks/use-cart";
import { useApi } from "@/src/hooks/useApi";
import { CartItem, ShoppingCart } from "@/src/types/cart.types";
import { useRef } from "react";

export default function useAlterCart() {
  const { shoppingCart, loading, setShoppingCart, refreshCart } = useCartContext();
  const { removeItem, clearCart } = useCart();
  const api = useApi();

  const debounceTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});

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

    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }
    debounceTimers.current[key] = setTimeout(async () => {
      try {
        await api.post("/cart", 1, JSON.stringify({ productId: targetItem.product.id, quantity: newQty, variant: { color: targetItem.color, size: targetItem.size } }));
      } catch (err) {
        console.error("Failed to sync qty, rolling back:", err);
        void refreshCart();
      } finally {
        delete debounceTimers.current[key];
      }
    }, 500);
  };

  return { shoppingCart, loading, updateQuantity, removeItem, clearCart }
}