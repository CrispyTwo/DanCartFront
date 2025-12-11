"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ShoppingCart } from "@/src/lib/models/ShoppingCart";
import { useAuthContext } from "./AuthContext";
import { useApi } from "../hooks/useApi";

interface CartContextType {
    itemCount: number;
    shoppingCart: ShoppingCart | null;
    loading: boolean;
    refreshCart: () => Promise<void>;
    setShoppingCart: React.Dispatch<React.SetStateAction<ShoppingCart | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthContext();
    const api = useApi();

    const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);
    const [itemCount, setItemCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCart = useCallback(async () => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/cart", 1);
            console.log(response);
            setShoppingCart(response);
            setItemCount(response.items?.length || 0);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        } finally {
            setLoading(false);
        }
    }, [api, isAuthenticated]);

    useEffect(() => {
        void fetchCart();
    }, [fetchCart]);

    return (
        <CartContext.Provider value={{
            itemCount,
            shoppingCart,
            loading,
            refreshCart: fetchCart,
            setShoppingCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}
