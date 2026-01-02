
import { useApi } from "@/src/hooks/useApi";
import { ProductVariant } from "@/src/types/product.types";
import { useState } from "react";
import { useCartContext } from "../context/cart-context";
import { CartItem } from "@/src/types/cart.types";

export function useCart() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { shoppingCart, loading, refreshCart } = useCartContext();
  const api = useApi();

  const addToCart = async (productId: string, variant: ProductVariant, quantity?: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = JSON.stringify({
        productId,
        variant,
        ...(quantity ? { quantity } : {})
      })
      await api.post("/cart", 1, payload);
      await refreshCart();
      return true;
    } catch (err: any) {
      console.error("Failed to add to cart:", err);
      setError(err?.message || "Failed to add to cart");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (item: CartItem) => {
    try {
      rerouteIfNotAuthenticated();
      const payload = JSON.stringify({ color: item.color, size: item.size })
      console.log(payload)
      await api.delete(`/cart/${item.product.id}`, 1, payload);
      await refreshCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const clearCart = async () => {
    try {
      rerouteIfNotAuthenticated();

      await api.delete("/cart", 1, "");
      await refreshCart();
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  return {
    shoppingCart,
    loading,
    addToCart,
    removeItem,
    clearCart,
    refreshCart
  };
}