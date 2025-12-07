import { useState, useEffect, useCallback } from "react";
import { ApiService } from "../../lib/api/ApiService";
import { AuthenticationService } from "../../lib/services/AuthenticationService";
import { ShoppingCart, CartItem } from "@/src/lib/models/ShoppingCart";

export function useCart() {
    const [itemCount, setItemCount] = useState<number>(0);
    const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCart = useCallback(async () => {
        const authService = new AuthenticationService();
        if (!authService.isAuthenticated()) {
            setLoading(false);
            return;
        }

        try {
            const apiService = new ApiService();
            const token = authService.getToken();
            if (!token) return;

            const response = await apiService.get("/cart", 1, token);
            console.log(response);
            const items: CartItem[] = response.items;

            setShoppingCart(response);
            setItemCount(items.length);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchCart();
    }, [fetchCart]);

    const updateQuantity = async (productId: number, quantity: number) => {
        try {
            const authService = new AuthenticationService();
            const token = authService.getToken();
            if (!token) return;

            const apiService = new ApiService();
            await apiService.post("/cart", 1, JSON.stringify({ productId, quantity }), token);
            await fetchCart();
        } catch (err) {
            console.error("Failed to update cart:", err);
        }
    };

    const removeItem = async (productId: number) => {
        try {
            const authService = new AuthenticationService();
            const token = authService.getToken();
            if (!token) return;

            const apiService = new ApiService();
            await apiService.delete(`/cart/${productId}`, 1, "", token);
            await fetchCart();
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    const clearCart = async () => {
        try {
            const authService = new AuthenticationService();
            const token = authService.getToken();
            if (!token) return;

            const apiService = new ApiService();
            await apiService.delete("/cart", 1, "", token);
            await fetchCart();
        } catch (err) {
            console.error("Failed to clear cart:", err);
        }
    };

    return { itemCount, shoppingCart, loading, updateQuantity, removeItem, clearCart };
}
