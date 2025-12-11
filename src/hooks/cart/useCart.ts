import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "../../context/CartContext";
import { useApi } from "../useApi";
import { useAuthContext } from "../../context/AuthContext";
import { ShoppingCart } from "../../lib/models/ShoppingCart";

export function useCart() {
    const { shoppingCart, loading, setShoppingCart, refreshCart } = useCartContext();
    const { isAuthenticated } = useAuthContext();
    const router = useRouter();
    const api = useApi();

    const debounceTimers = useRef<{ [key: string]: NodeJS.Timeout }>({});
    const updateQuantity = (productId: string, newQty: number) => {
        if (newQty < 1) return;
        setShoppingCart((prevCart: ShoppingCart | null) => {
            if (!prevCart) return null;

            const updatedItems = prevCart.items.map((item) =>
                item.product.id === productId ? { ...item, quantity: newQty } : item
            );

            const newTotal = updatedItems.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );

            return { ...prevCart, items: updatedItems, total: newTotal };
        });

        if (debounceTimers.current[productId]) {
            clearTimeout(debounceTimers.current[productId]);
        }
        debounceTimers.current[productId] = setTimeout(async () => {
            try {
                if (!isAuthenticated) {
                    router.push("/auth");
                    return;
                }

                await api.post("/cart", 1, JSON.stringify({ productId, quantity: newQty }));
            } catch (err) {
                console.error("Failed to sync qty, rolling back:", err);
                void refreshCart();
            } finally {
                delete debounceTimers.current[productId];
            }
        }, 500);
    };

    const removeItem = async (productId: string) => {
        try {
            if (!isAuthenticated) return;

            await api.delete(`/cart/${productId}`, 1, "");
            await refreshCart();
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    const clearCart = async () => {
        try {
            if (!isAuthenticated) return;

            await api.delete("/cart", 1, "");
            await refreshCart();
        } catch (err) {
            console.error("Failed to clear cart:", err);
        }
    };

    return {
        shoppingCart,
        loading,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart
    };
}