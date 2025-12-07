import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthenticationService } from "@/src/lib/services/AuthenticationService";
import { ApiService } from "@/src/lib/api/ApiService";

export function useAddToCart() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const addToCart = async (productId: number, quantity?: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const authService = new AuthenticationService();
            const token = authService.getToken();
            if (!authService.isAuthenticated() || !token) {
                router.push("/auth");
                return false;
            }

            const apiService = new ApiService();
            const payload = JSON.stringify({
                productId,
                ...(quantity ? { quantity } : {})
            })
            await apiService.post("/cart", 1, payload, token!);
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
