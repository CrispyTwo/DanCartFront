import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/src/features/cart/context/cart-context";
import { useApi } from "@/src/hooks/useApi";
import { ProductVariant } from "@/src/types/product.types";

export function useAddToCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const api = useApi();
  const { refreshCart } = useCartContext();

  const addToCart = async (productId: string, variant: ProductVariant, quantity?: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!api.isAuthenticated()) {
        router.push("/auth");
        return false;
      }

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

  return { addToCart, isLoading, error };
}
